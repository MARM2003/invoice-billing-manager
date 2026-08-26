import { createManualPayment, getPayments, getPaymentById, getInvoicePayments } from "../services/payment.service.js";

export const createManualPaymentController = async (req, res, next) => {
    try {
        const payment = await createManualPayment({
            userId: req.user.userId,
            ...req.body,
        });

        return res.status(201).json({
            success: true,
            message: "Payment recorded successfully",
            data: payment,
        });
    } catch (error) {
        next(error);
    }
};

export const getPaymentsController = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = "",
            status,
            method,
        } = req.query;

        const result = await getPayments({
            userId: req.user.userId,
            page: Number(page),
            limit: Number(limit),
            search,
            status,
            method,
        });

        return res.status(200).json({
            success: true,
            message: "Payments fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getPaymentByIdController = async (req, res, next) => {
    try {
        const payment = await getPaymentById({
            userId: req.user.userId,
            paymentId: req.params.id,
        });

        return res.status(200).json({
            success: true,
            message: "Payment fetched successfully",
            data: payment,
        });
    } catch (error) {
        next(error);
    }
};

export const getInvoicePaymentsController = async (req, res, next) => {
    try {
        const result = await getInvoicePayments({
            userId: req.user.userId,
            invoiceId: req.params.id,
        });

        return res.status(200).json({
            success: true,
            message: "Invoice payments fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};