import {
    getInvoicesAPI,
    getInvoiceByIdAPI,
    createInvoiceAPI,
    updateInvoiceAPI,
    deleteInvoiceAPI,
    getInvoicePdfAPI,
    sendInvoiceAPI,
} from "../api/invoice.api.js"

//GET all invoices
export const getInvoicesService = async (filters) => {
    return getInvoicesAPI(filters);
}

//GET invoice by Id service

export const getInvoiceByIdService = async (invoiceId) => {
    return getInvoiceByIdAPI(invoiceId)
}

//Create invoice service

export const createInvoiceService = async (invoiceData) => {
    return createInvoiceAPI(invoiceData)
}

//update invoice service
export const updateInvoiceService = async (invoiceId, invoiceData) => {
    return await updateInvoiceAPI(invoiceId, invoiceData)
}

//delete invoice service
export const deleteInvoiceService = async (invoiceId) => {
    return await deleteInvoiceAPI(invoiceId)
}

//invoice pdf service
export const invoicePdfService = async (invoiceId) => {
    return await getInvoicePdfAPI(invoiceId)
}

//email send service
export const sendInvoiceService = async (invoiceId) => {
    return await sendInvoiceAPI(invoiceId);
};