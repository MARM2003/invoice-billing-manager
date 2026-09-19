import express from "express";

import {
    getPlans,
    getMySubscription,
    createCheckout,
} from "../../controllers/subscription.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/plans", authMiddleware, getPlans);

router.get(
    "/me",
    authMiddleware,
    getMySubscription
);

router.post(
    "/checkout",
    authMiddleware,
    createCheckout
);

export default router;