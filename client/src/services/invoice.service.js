import {
    getInvoicesAPI,
    getInvoiceByIdAPI,
    createInvoiceAPI,
    updateInvoiceAPI,
    deleteInvoiceAPI
} from "../api/invoice.api.js"

//GET all invoices
export const getInvoicesService = async (filters) => {
    return  getInvoicesAPI(filters);
}

//GET invoice by Id service

export const getInvoiceByIdService = async (invoiceId) => {
    return  getInvoiceByIdAPI(invoiceId)
}

//Create invoice service

export const createInvoiceService = async (invoiceData) => {
    return createInvoiceAPI(invoiceData)
}

//update invoice service
export const updateInvoiceService = async (invoiceId, invoiceData) => {
    return updateInvoiceAPI(invoiceId, invoiceData)
}

//delete invoice service
export const deleteInvoiceService = async (invoiceId) => {
    return deleteInvoiceAPI(invoiceId)
}