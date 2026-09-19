import {
    getSubscriptionPlans,
    getUserSubscription,
    createCheckoutSession,
} from "../services/subscription.service.js";

export const getPlans = async (req, res, next) => {
    try {
        const plans = await getSubscriptionPlans();

        res.status(200).json({
            success: true,
            data: plans,
        });
    } catch (error) {
        next(error);
    }
};

export const getMySubscription = async (req, res, next) => {
    try {
        const subscription = await getUserSubscription(req.user.userId);

        res.status(200).json({
            success: true,
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
};

export const createCheckout = async (req, res, next) => {
    try {
        
        const { plan } = req.body;

        const result = await createCheckoutSession({
            userId: req.user.userId,
            // user: req.user,
            plan,
        });

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};


