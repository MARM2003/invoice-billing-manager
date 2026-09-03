import express from "express";

import {
    createInvoicePaymentLink, stripeWebhook
} from "../../controllers/stripe.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js"

const router = express.Router();
router.post("/webhook", stripeWebhook);

router.post(
    "/:invoiceId",
    authMiddleware,
    createInvoicePaymentLink
);

export default router;