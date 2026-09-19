import api from "./axios.js";

export const getSubscriptionPlansApi = async () => {
    const response = await api.get("/subscriptions/plans");

    return response.data;
};

export const getMySubscriptionApi = async () => {
    const response = await api.get("/subscriptions/me");

    return response.data;
};

export const createSubscriptionCheckoutApi = async (plan) => {
    const response = await api.post("/subscriptions/checkout", {
        plan,
    });

    return response.data;
};