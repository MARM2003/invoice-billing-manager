import api from "./axios";

// Get invoices (supports pagination & filters)
export const getInvoicesAPI = async (params) => {
    const response = await api.get("/invoices", { params })
    return response.data;
}

// GET invoice by ID
export const getInvoiceByIdAPI = async (invoiceId) => {
    const response = await api.get(`/invoices/${invoiceId}`)
    return response.data;
}

//Create invoice
export const createInvoiceAPI = async (invoiceData) => {
    const response = await api.post("/invoices", invoiceData)

    return response.data;
}

// Update invoice
export const updateInvoiceAPI = async (invoiceId, invoiceData) => {
    const response = await api.put(`/invoices/${invoiceId}`, invoiceData)

    return response.data
}

// delete invoice 
export const deleteInvoiceAPI = async (invoiceId) => {
    const response = await api.delete(`/invoices/${invoiceId}`);

    return response.data;
}