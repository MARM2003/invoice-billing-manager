import api from './axios.js'

// Create manual payment
export const createManualPaymentApi = async (paymentData) => {
    const response = await api.post("/payments", paymentData);

    return response.data;
};


// Get payments with pagination, search, and filters
export const getPaymentsApi = async ({
    page = 1,
    limit = 10,
    search = "",
    status,
    method,
} = {}) => {
    const response = await api.get("/payments", {
        params: {
            page,
            limit,
            search,
            status,
            method,
        },
    });

    return response.data;
};


// Get payment by ID
export const getPaymentByIdApi = async (paymentId) => {
    const response = await api.get(`/payments/${paymentId}`);

    return response.data;
};


// Get payments for a specific invoice
export const getInvoicePaymentsApi = async (invoiceId) => {
    const response = await api.get(
        `/invoices/${invoiceId}/payments`
    );

    return response.data;
};