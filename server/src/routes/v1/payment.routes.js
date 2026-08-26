import express from "express";

import {
    createManualPaymentController,
    getPaymentsController,
    getPaymentByIdController,
    
} from "../../controllers/payment.controller.js";

import { createManualPaymentSchema } from "../../validations/payment.validation.js";

import authMiddleware from "../../middleware/auth.middleware.js";

import { validate } from "../../middleware/validate.middleware.js";

const router = express.Router();

// Create manual payment
router.post(
    "/",
    authMiddleware,
    validate(createManualPaymentSchema),
    createManualPaymentController
);

// Get payments with pagination
router.get(
    "/",
    authMiddleware,
    getPaymentsController
);

// Get payment by ID
router.get(
    "/:id",
    authMiddleware,
    getPaymentByIdController
);

export default router;