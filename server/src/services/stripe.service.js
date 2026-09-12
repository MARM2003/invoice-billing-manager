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

    const existingStripePayment =
        await prisma.payment.findFirst({
            where: {
                invoiceId: invoice.id,
                userId,
                method: "STRIPE_CARD",
                status: "PAID",
            },
        });

    if (existingStripePayment) {
        throw new ApiError(
            400,
            "Payment link cannot be created because this invoice has already been paid."
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

export const handleStripeWebhookService = async (event) => {
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;

            if (session.payment_status !== "paid") {
                return;
            }

            const {
                invoiceId,
                customerId,
                userId,
            } = session.metadata ?? {};

            if (!invoiceId || !customerId || !userId) {
                throw new ApiError(
                    400,
                    "Missing payment metadata"
                );
            }

            try {
                const result = await prisma.$transaction(async (tx) => {
                    /*
                     * 1. Check whether this exact Stripe Checkout
                     *    Session has already been processed.
                     */
                    const existingSessionPayment =
                        await tx.payment.findUnique({
                            where: {
                                stripeCheckoutSessionId: session.id,
                            },
                        });

                    if (existingSessionPayment) {
                        return {
                            payment: existingSessionPayment,
                            alreadyProcessed: true,
                        };
                    }

                    /*
                     * 2. Verify the invoice belongs to this user.
                     */
                    const invoice = await tx.invoice.findFirst({
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

                    /*
                     * 3. Check whether this invoice has already
                     *    received a successful Stripe payment.
                     *
                     *    This is the important protection.
                     *
                     *    It prevents another payment even if
                     *    invoice.status was changed from PAID
                     *    back to SENT/DRAFT/etc.
                     */
                    const existingInvoicePayment =
                        await tx.payment.findFirst({
                            where: {
                                invoiceId,
                                userId,
                                method: "STRIPE_CARD",
                                status: "PAID",
                            },
                        });

                    if (existingInvoicePayment) {
                        return {
                            payment: existingInvoicePayment,
                            alreadyProcessed: true,
                        };
                    }

                    /*
                     * 4. Create the payment.
                     */
                    const payment = await tx.payment.create({
                        data: {
                            amount: session.amount_total / 100,
                            paymentDate: new Date(),
                            method: "STRIPE_CARD",
                            status: "PAID",
                            stripeCheckoutSessionId: session.id,
                            stripePaymentIntentId:
                                session.payment_intent,
                            invoiceId,
                            customerId,
                            userId,
                        },
                    });

                    /*
                     * 5. Mark invoice as PAID.
                     */
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
                        alreadyProcessed: false,
                    };
                });

                return result;
            } catch (error) {
                /*
                 * Stripe may deliver the same webhook more than once.
                 *
                 * stripeCheckoutSessionId is UNIQUE in Prisma,
                 * so a concurrent duplicate attempt can produce
                 * a P2002 error.
                 *
                 * Treat that as an already-processed payment.
                 */
                if (
                    error.code === "P2002" &&
                    error.meta?.target?.includes(
                        "stripeCheckoutSessionId"
                    )
                ) {
                    return await prisma.payment.findUnique({
                        where: {
                            stripeCheckoutSessionId: session.id,
                        },
                    });
                }

                throw error;
            }
        }

        case "checkout.session.expired": {
            /*
             * No payment was completed.
             *
             * Therefore:
             * - Do not create a Payment record.
             * - Do not change invoice status.
             */
            return;
        }

        default:
            return;
    }
};

