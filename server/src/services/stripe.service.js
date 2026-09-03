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