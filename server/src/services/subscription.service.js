import prisma from "../prismaClient/prismaClient.js";
import stripe from "../config/stripe.js";
import ApiError from "../utils/ApiError.js"
import {
  FREE_INVOICE_LIMIT,
  SUBSCRIPTION_PLANS,
} from "../config/subscriptionPlans.js";

export const getSubscriptionPlans = async () => {
  return Object.values(SUBSCRIPTION_PLANS);
};

export const getUserSubscription = async (userId) => {
  const subscription = await prisma.subscription.findUnique({
    where: {
      userId,
    },
  });

  if (!subscription) {
    return {
      plan: "FREE",
      status: "ACTIVE",
      invoiceLimit: FREE_INVOICE_LIMIT,
    };
  }
  const invoiceCount = await prisma.invoice.count({
    where: {
      userId,
    },
  });
  const plan = SUBSCRIPTION_PLANS[subscription.plan];

  return {
    ...subscription,
    invoiceLimit: plan?.invoiceLimit ?? null,
    invoiceCount
  };
};

export const canCreateInvoice = async (userId) => {
  const subscription = await prisma.subscription.findUnique({
    where: {
      userId,
    },
  });

  /*
   * Paid subscription with active/trialing status
   * gets unlimited invoices.
   */
  if (
    subscription &&
    subscription.plan !== "FREE" &&
    ["ACTIVE", "TRIALING"].includes(subscription.status)
  ) {
    return {
      allowed: true,
      reason: null,
    };
  }

  /*
   * No subscription means FREE plan.
   */
  const invoiceCount = await prisma.invoice.count({
    where: {
      userId,
    },
  });

  if (invoiceCount >= FREE_INVOICE_LIMIT) {
    return {
      allowed: false,
      reason: "FREE_INVOICE_LIMIT_REACHED",
      invoiceCount,
      invoiceLimit: FREE_INVOICE_LIMIT,
    };
  }

  return {
    allowed: true,
    reason: null,
    invoiceCount,
    invoiceLimit: FREE_INVOICE_LIMIT,
  };
};

export const createCheckoutSession = async ({
  userId,
  plan,
}) => {
  if (!["STARTER", "PROFESSIONAL"].includes(plan)) {
    throw new ApiError(401, "Invalid subscription plan");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  const priceId =
    plan === "STARTER"
      ? process.env.STRIPE_STARTER_PRICE_ID
      : process.env.STRIPE_PROFESSIONAL_PRICE_ID;

  if (!priceId) {
    throw new Error(`Stripe price ID is not configured for ${plan}`);
  }

  let subscription = await prisma.subscription.findUnique({
    where: {
      userId,
    },
  });

  let stripeCustomerId = subscription?.stripeCustomerId;

  /*
   * Create Stripe customer if the user doesn't
   * have one yet.
   */
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: {
        userId,
      },
    });

    stripeCustomerId = customer.id;

    subscription = await prisma.subscription.upsert({
      where: {
        userId,
      },
      update: {
        stripeCustomerId,
      },
      create: {
        userId,
        plan: "FREE",
        status: "ACTIVE",
        stripeCustomerId,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",

    customer: stripeCustomerId,

    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],

    success_url: `${process.env.CLIENT_URL}/subscription/success`,
    cancel_url: `${process.env.CLIENT_URL}/subscription`,

    metadata: {
      userId,
      plan,
    },

    subscription_data: {
      metadata: {
        userId,
        plan,
      },
    },
  });

  return {
    checkoutUrl: session.url,
    sessionId: session.id,
  };
};

// export const handleSubscriptionWebhook = async (event) => {
//   switch (event.type) {
//     case "checkout.session.completed": {
//       const session = event.data.object;

//       if (!session.subscription) {
//         break;
//       }

//       const stripeSubscription =
//         await stripe.subscriptions.retrieve(
//           session.subscription
//         );

//       const userId = session.metadata?.userId;
//       const plan = session.metadata?.plan;

//       if (!userId || !plan) {
//         console.error(
//           "Missing userId or plan in Stripe session metadata"
//         );
//         break;
//       }

//       await prisma.subscription.upsert({
//         where: {
//           userId,
//         },

//         update: {
//           plan,
//           status: mapStripeStatus(stripeSubscription.status),
//           stripeCustomerId: session.customer,
//           stripeSubscriptionId: stripeSubscription.id,
//           currentPeriodStart: new Date(
//             stripeSubscription.current_period_start * 1000
//           ),
//           currentPeriodEnd: new Date(
//             stripeSubscription.current_period_end * 1000
//           ),
//         },

//         create: {
//           userId,
//           plan,
//           status: mapStripeStatus(stripeSubscription.status),
//           stripeCustomerId: session.customer,
//           stripeSubscriptionId: stripeSubscription.id,
//           currentPeriodStart: new Date(
//             stripeSubscription.current_period_start * 1000
//           ),
//           currentPeriodEnd: new Date(
//             stripeSubscription.current_period_end * 1000
//           ),
//         },
//       });

//       break;
//     }

//     case "customer.subscription.updated": {
//       const stripeSubscription = event.data.object;

//       await updateSubscriptionFromStripe(
//         stripeSubscription
//       );

//       break;
//     }

//     case "customer.subscription.deleted": {
//       const stripeSubscription = event.data.object;

//       await prisma.subscription.updateMany({
//         where: {
//           stripeSubscriptionId: stripeSubscription.id,
//         },
//         data: {
//           status: "CANCELED",
//         },
//       });

//       break;
//     }

//     case "invoice.payment_failed": {
//       const invoice = event.data.object;

//       if (!invoice.subscription) {
//         break;
//       }

//       await prisma.subscription.updateMany({
//         where: {
//           stripeSubscriptionId: invoice.subscription,
//         },
//         data: {
//           status: "PAST_DUE",
//         },
//       });

//       break;
//     }

//     default:
//       console.log(`Unhandled Stripe event: ${event.type}`);
//   }
// };

export const handleSubscriptionWebhook = async (event) => {
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        

        if (!session.subscription) {
          console.log("No subscription found in checkout session");
          break;
        }

        const stripeSubscription =
          await stripe.subscriptions.retrieve(
            session.subscription
          );

        await syncSubscription(stripeSubscription);

        break;
      }

      case "customer.subscription.created": {
        const stripeSubscription = event.data.object;

        

        await syncSubscription(stripeSubscription);

        break;
      }

      case "customer.subscription.updated": {
        const stripeSubscription = event.data.object;

        

        await syncSubscription(stripeSubscription);

        break;
      }

      case "customer.subscription.deleted": {
        const stripeSubscription = event.data.object;

        
        await prisma.subscription.updateMany({
          where: {
            stripeSubscriptionId: stripeSubscription.id,
          },
          data: {
            status: "CANCELED",
          },
        });

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;

        if (!invoice.subscription) {
          break;
        }

        await prisma.subscription.updateMany({
          where: {
            stripeSubscriptionId: invoice.subscription,
          },
          data: {
            status: "PAST_DUE",
          },
        });

        break;
      }

      default:
        console.log(
          `Unhandled Stripe event: ${event.type}`
        );
    }
  } catch (error) {
    console.error(
      "SUBSCRIPTION WEBHOOK ERROR:",
      error
    );

    throw error;
  }
};
const syncSubscription = async (stripeSubscription) => {
  const userId = stripeSubscription.metadata?.userId;
  const plan = stripeSubscription.metadata?.plan;


  if (!userId || !plan) {
    console.error(
      "Missing userId or plan on Stripe subscription"
    );

    return;
  }

  const mappedStatus = mapStripeStatus(
    stripeSubscription.status
  );

  await prisma.subscription.upsert({
    where: {
      userId,
    },

    update: {
      plan,
      status: mappedStatus,

      stripeCustomerId:
        stripeSubscription.customer,

      stripeSubscriptionId:
        stripeSubscription.id,

      currentPeriodStart:
        stripeSubscription.current_period_start
          ? new Date(
            stripeSubscription.current_period_start * 1000
          )
          : null,

      currentPeriodEnd:
        stripeSubscription.current_period_end
          ? new Date(
            stripeSubscription.current_period_end * 1000
          )
          : null,
    },

    create: {
      userId,

      plan,

      status: mappedStatus,

      stripeCustomerId:
        stripeSubscription.customer,

      stripeSubscriptionId:
        stripeSubscription.id,

      currentPeriodStart:
        stripeSubscription.current_period_start
          ? new Date(
            stripeSubscription.current_period_start * 1000
          )
          : null,

      currentPeriodEnd:
        stripeSubscription.current_period_end
          ? new Date(
            stripeSubscription.current_period_end * 1000
          )
          : null,
    },
  });

 
};

const mapStripeStatus = (status) => {
  const statusMap = {
    active: "ACTIVE",
    canceled: "CANCELED",
    past_due: "PAST_DUE",
    incomplete: "INCOMPLETE",
    incomplete_expired: "INCOMPLETE_EXPIRED",
    trialing: "TRIALING",
  };

  return statusMap[status] || "INCOMPLETE";
};

const updateSubscriptionFromStripe = async (
  stripeSubscription
) => {
  const userId = stripeSubscription.metadata?.userId;
  const plan = stripeSubscription.metadata?.plan;

  if (!userId || !plan) {
    console.error(
      "Missing metadata on Stripe subscription"
    );
    return;
  }

  await prisma.subscription.upsert({
    where: {
      userId,
    },

    update: {
      plan,
      status: mapStripeStatus(
        stripeSubscription.status
      ),
      stripeCustomerId:
        stripeSubscription.customer,
      stripeSubscriptionId:
        stripeSubscription.id,
      currentPeriodStart: new Date(
        stripeSubscription.current_period_start * 1000
      ),
      currentPeriodEnd: new Date(
        stripeSubscription.current_period_end * 1000
      ),
    },

    create: {
      userId,
      plan,
      status: mapStripeStatus(
        stripeSubscription.status
      ),
      stripeCustomerId:
        stripeSubscription.customer,
      stripeSubscriptionId:
        stripeSubscription.id,
      currentPeriodStart: new Date(
        stripeSubscription.current_period_start * 1000
      ),
      currentPeriodEnd: new Date(
        stripeSubscription.current_period_end * 1000
      ),
    },
  });
};