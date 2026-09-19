import {
    getSubscriptionPlansApi,
    getMySubscriptionApi,
    createSubscriptionCheckoutApi,
} from "../api/subscription.api.js";

export const getSubscriptionPlansService = async () => {
    return getSubscriptionPlansApi();
};

export const getMySubscriptionService = async () => {
    return getMySubscriptionApi();
};

export const createSubscriptionCheckoutService = async (plan) => {
    return createSubscriptionCheckoutApi(plan);
};