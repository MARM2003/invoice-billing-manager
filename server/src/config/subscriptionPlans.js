export const FREE_INVOICE_LIMIT = 15;

export const SUBSCRIPTION_PLANS = {
    FREE: {
        id: "FREE",
        name: "Free",
        price: 0,
        interval: "month",
        invoiceLimit: 15,
    },

    STARTER: {
        id: "STARTER",
        name: "Starter",
        price: 299,
        interval: "month",
        invoiceLimit: null,
    },

    PROFESSIONAL: {
        id: "PROFESSIONAL",
        name: "Professional",
        price: 599,
        interval: "month",
        invoiceLimit: null,
    },
};