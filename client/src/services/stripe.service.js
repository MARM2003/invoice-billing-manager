import { onlineInvoicePaymentLinkAPI } from "../api/stripe.api.js"

export const onlinePaymentLinkService = async (invoiceId) => {
    const response = await onlineInvoicePaymentLinkAPI(invoiceId)

    return response.data
}