import express from "express";

import {
    createInvoicePaymentLink,
} from "../../controllers/stripe.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js"

const router = express.Router();

router.post(
    "/:invoiceId",
    authMiddleware,
    createInvoicePaymentLink
);

export default router;