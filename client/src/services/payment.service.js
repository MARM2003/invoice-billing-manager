import {
    createManualPaymentApi,
    getPaymentsApi,
    getPaymentByIdApi,
    getInvoicePaymentsApi,
} from "../api/payment.api.js";


// Create manual payment
export const createManualPaymentService = async (paymentData) => {
    const response = await createManualPaymentApi(paymentData);

    return response;
};


// Get payments with pagination, search, and filters
export const getPaymentsService = async (params = {}) => {
    const response = await getPaymentsApi(params);

    return response;
};


// Get payment by ID
export const getPaymentByIdService = async (paymentId) => {
    const response = await getPaymentByIdApi(paymentId);

    return response;
};


// Get payments for a specific invoice
export const getInvoicePaymentsService = async (invoiceId) => {
    const response = await getInvoicePaymentsApi(invoiceId);

    return response;
};