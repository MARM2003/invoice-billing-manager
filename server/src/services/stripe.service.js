import prisma from "../prismaClient/prismaClient.js";
import stripe from "../config/stripe.js";
import ApiError from "../utils/ApiError.js"


export const createInvoicePaymentLinkService = async ({
    invoiceId,
    userId,
}) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            accountNumber: true,
            accountHolderName: true,
            ifscCode: true,
        },
    });

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    if (
        !user.accountNumber ||
        !user.accountHolderName ||
        !user.ifscCode
    ) {
        throw new ApiError(400, "Please fill in your bank details in the Settings page before creating a payment link.")
    }

    const invoice = await prisma.invoice.findFirst({
        where: {
            id: invoiceId,
            userId,
        },
        include: {
            customer: true,
        },
    });

    if (!invoice) {
        throw new ApiError(404, "Invoice not found");
    }

    if (["PAID", "CANCELLED"].includes(invoice.status)) {
        throw new ApiError(
            400,
            "Payment link cannot be created for this invoice."
        );
    }
    if (Number(invoice.totalAmount) <= 0) {
        throw new ApiError(400,
            "Invoice amount must be greater than zero"

        );
    }
    const expiryMinutes = Number(
        process.env.STRIPE_PAYMENT_LINK_EXPIRY_MINUTES || 30
    );

    const expiresAt = Math.floor(Date.now() / 1000) + expiryMinutes * 60;
    const session = await stripe.checkout.sessions.create({
        mode: "payment",

        line_items: [
            {
                price_data: {
                    currency: "inr",

                    product_data: {
                        name: `Invoice ${invoice.invoiceNumber}`,
                    },

                    unit_amount: Math.round(
                        Number(invoice.totalAmount) * 100
                    ),
                },

                quantity: 1,
            },
        ],

        expires_at: expiresAt,

        customer_email: invoice.customer.email,

        metadata: {
            invoiceId: invoice.id,
            customerId: invoice.customer.id,
            userId: invoice.userId,
        },

        success_url:
            `${process.env.CLIENT_URL}/payment-success` +
            `?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
            `${process.env.CLIENT_URL}/payment-cancelled`,
    });

    return {
        paymentUrl: session.url,
        sessionId: session.id,
    };
};

// export const handleStripeWebhookService = async (event) => {
//     switch (event.type) {
//         case "checkout.session.completed": {
//             const session = event.data.object;

//             // Payment was not actually completed
//             if (session.payment_status !== "paid") {
//                 return;
//             }

//             const {
//                 invoiceId,
//                 customerId,
//                 userId,
//             } = session.metadata;

//             if (!invoiceId || !customerId || !userId) {
//                 throw new ApiError(
//                     400,
//                     "Missing payment metadata"
//                 );
//             }

//             const invoice = await prisma.invoice.findFirst({
//                 where: {
//                     id: invoiceId,
//                     userId,
//                 },
//             });

//             if (!invoice) {
//                 throw new ApiError(
//                     404,
//                     "Invoice not found"
//                 );
//             }

//             // Prevent duplicate payment processing
//             const existingPayment =
//                 await prisma.payment.findUnique({
//                     where: {
//                         stripeCheckoutSessionId: session.id,
//                     },
//                 });

//             if (existingPayment) {
//                 return;
//             }

//             const result = await prisma.$transaction(
//                 async (tx) => {
//                     const payment = await tx.payment.create({
//                         data: {
//                             amount: session.amount_total / 100,
//                             paymentDate: new Date(),
//                             method: "STRIPE_CARD",
//                             status: "PAID",
//                             stripeCheckoutSessionId: session.id,
//                             stripePaymentIntentId:
//                                 session.payment_intent,
//                             invoiceId,
//                             customerId,
//                             userId,
//                         },
//                     });

//                     const updatedInvoice =
//                         await tx.invoice.update({
//                             where: {
//                                 id: invoiceId,
//                             },
//                             data: {
//                                 status: "PAID",
//                             },
//                         });

//                     return {
//                         payment,
//                         invoice: updatedInvoice,
//                     };
//                 }
//             );

//             return result;
//         }

//         case "checkout.session.expired": {
//             const session = event.data.object;

//             console.log(
//                 `Stripe checkout session expired: ${session.id}`
//             );

//             // No Payment record is created.
//             // Invoice remains unpaid.
//             return;
//         }

//         default:
//             return;
//     }
// };


export const handleStripeWebhookService = async (event) => {
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;

            // Payment was not actually completed
            if (session.payment_status !== "paid") {
                return;
            }

            const {
                invoiceId,
                customerId,
                userId,
            } = session.metadata;

            if (!invoiceId || !customerId || !userId) {
                throw new ApiError(
                    400,
                    "Missing payment metadata"
                );
            }

            // Check whether this Checkout Session
            // has already been processed.
            const existingPayment =
                await prisma.payment.findUnique({
                    where: {
                        stripeCheckoutSessionId: session.id,
                    },
                });

            if (existingPayment) {
                console.log(
                    `Payment already processed for session: ${session.id}`
                );

                return existingPayment;
            }

            const invoice = await prisma.invoice.findFirst({
                where: {
                    id: invoiceId,
                    userId,
                },
            });

            if (!invoice) {
                throw new ApiError(
                    404,
                    "Invoice not found"
                );
            }

            // Safety check:
            // Do not process another payment if invoice
            // has already been marked as PAID.
            if (invoice.status === "PAID") {
                console.log(
                    `Invoice ${invoiceId} is already paid`
                );

                return;
            }

            try {
                const result = await prisma.$transaction(
                    async (tx) => {
                        const payment =
                            await tx.payment.create({
                                data: {
                                    amount:
                                        session.amount_total / 100,

                                    paymentDate: new Date(),

                                    method: "STRIPE_CARD",

                                    status: "PAID",

                                    stripeCheckoutSessionId:
                                        session.id,

                                    stripePaymentIntentId:
                                        session.payment_intent,

                                    invoiceId,

                                    customerId,

                                    userId,
                                },
                            });

                        const updatedInvoice =
                            await tx.invoice.update({
                                where: {
                                    id: invoiceId,
                                },
                                data: {
                                    status: "PAID",
                                },
                            });

                        return {
                            payment,
                            invoice: updatedInvoice,
                        };
                    }
                );

                return result;
            } catch (error) {
                // Stripe can send the same webhook more than once.
                //
                // Because stripeCheckoutSessionId is UNIQUE,
                // Prisma will reject a duplicate payment.
                //
                // Check again whether the payment now exists.
                if (
                    error.code === "P2002" &&
                    error.meta?.target?.includes(
                        "stripeCheckoutSessionId"
                    )
                ) {
                    const existingPayment =
                        await prisma.payment.findUnique({
                            where: {
                                stripeCheckoutSessionId:
                                    session.id,
                            },
                        });

                    console.log(
                        `Duplicate webhook ignored for session: ${session.id}`
                    );

                    return existingPayment;
                }

                throw error;
            }
        }

        case "checkout.session.expired": {
            const session = event.data.object;

            console.log(
                `Stripe checkout session expired: ${session.id}`
            );

            // No Payment record is created.
            // Invoice remains unpaid.

            return;
        }

        default:
            return;
    }
};