import "dotenv/config"
import { createInvoicePaymentLinkService, handleStripeWebhookService } from "../services/stripe.service.js";
import stripe from "../config/stripe.js";

export const createInvoicePaymentLink = async (req, res, next) => {
    try {
        const { invoiceId } = req.params;
        const userId = req.user.userId;

        const paymentLink = await createInvoicePaymentLinkService({
            invoiceId,
            userId,
        });

        return res.status(201).json({
            success: true,
            message: "Payment link created successfully",
            data: paymentLink,
        });
    } catch (error) {
        next(error);
    }
};

export const stripeWebhook = async (req, res, next) => {
    try {
        const signature = req.headers["stripe-signature"];


        const event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        await handleStripeWebhookService(event);

        return res.status(200).json({
            received: true,
        });
    } catch (error) {
        next(error)

    }
};