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

    if (invoice.status === "PAID") {
        throw new ApiError(
            400,
            "Payment link cannot be created because this invoice is already paid."
        );
    }
    if (Number(invoice.totalAmount) <= 0) {
        throw new ApiError(400,
            "Invoice amount must be greater than zero"

        );
    }

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

//     if (event.type !== "checkout.session.completed") {
//         return;
//     }

//     const session = event.data.object;

//     const {
//         invoiceId,
//         customerId,
//         userId,
//     } = session.metadata;

//     if (!invoiceId || !customerId || !userId) {
//         throw new ApiError(
//             400,
//             "Missing payment metadata"
//         );
//     }
//     const invoice = await prisma.invoice.findFirst({
//         where: {
//             id: invoiceId,
//             userId,
//         },
//     });
//     if (!invoice) {
//         throw new ApiError(
//             404,
//             "Invoice not found"
//         );
//     }
//     const existingPayment = await prisma.payment.findUnique({
//         where: {
//             stripeCheckoutSessionId: session.id,
//         },
//     });

//     if (existingPayment) {
//         return;
//     }

//     const amount = session.amount_total / 100;

//     const payment = await prisma.payment.create({
//         data: {
//             amount,
//             paymentDate: new Date(),

//             method: "STRIPE_CARD",
//             status: "PAID",

//             stripeCheckoutSessionId: session.id,
//             stripePaymentIntentId: session.payment_intent,

//             invoiceId,
//             customerId,
//             userId,
//         },
//     });

//     await prisma.invoice.update({
//         where: {
//             id: invoiceId,
//         },
//         data: {
//             status: "PAID",
//         },
//     });

//     // Payment processing will go here
// };


export const handleStripeWebhookService = async (event) => {
    if (event.type !== "checkout.session.completed") {
        return;
    }

    const session = event.data.object;

    // 1. Verify payment
    if (session.payment_status !== "paid") {
        return;
    }

    // 2. Get metadata
    const {
        invoiceId,
        customerId,
        userId,
    } = session.metadata;

    // 3. Validate metadata
    if (!invoiceId || !customerId || !userId) {
        throw new ApiError(
            400,
            "Missing payment metadata"
        );
    }

    // 4. Find invoice
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

    // 5. Prevent duplicate payment
    const existingPayment = await prisma.payment.findUnique({
        where: {
            stripeCheckoutSessionId: session.id,
        },
    });

    if (existingPayment) {
        return;
    }

    // // 6. Create payment
    // await prisma.payment.create({
    //     data: {
    //         amount: session.amount_total / 100,
    //         paymentDate: new Date(),

    //         method: "STRIPE_CARD",
    //         status: "PAID",

    //         stripeCheckoutSessionId: session.id,
    //         stripePaymentIntentId: session.payment_intent,

    //         invoiceId,
    //         customerId,
    //         userId,
    //     },
    // });

    // // 7. Mark invoice as paid
    // await prisma.invoice.update({
    //     where: {
    //         id: invoiceId,
    //     },
    //     data: {
    //         status: "PAID",
    //     },
    // });

    const result = await prisma.$transaction(async (tx) => {
        const payment = await tx.payment.create({
            data: {
                amount: session.amount_total / 100,
                paymentDate: new Date(),

                method: "STRIPE_CARD",
                status: "PAID",

                stripeCheckoutSessionId: session.id,
                stripePaymentIntentId: session.payment_intent,

                invoiceId,
                customerId,
                userId,
            },
        });

        const updatedInvoice = await tx.invoice.update({
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
    });

    return result
};