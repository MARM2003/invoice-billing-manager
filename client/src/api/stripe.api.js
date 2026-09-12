import api from "./axios.js"

export const onlineInvoicePaymentLinkAPI = async (invoiceId) => {
    return api.post(`/stripe-payment/${invoiceId}`)
}