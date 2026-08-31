import { createInvoicePaymentLinkService } from "../services/stripe.service.js";

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