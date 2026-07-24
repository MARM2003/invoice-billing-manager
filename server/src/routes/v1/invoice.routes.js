import express from "express"
import { validate } from "../../middleware/validate.middleware.js"
import authMiddleware from "../../middleware/auth.middleware.js"
import { createInvoiceSchema } from "../../validations/invoice.validation.js"
import { createInvoice } from "../../controllers/invoice.controller.js"
const router = express.Router();


router.post(
    "/",
    authMiddleware,
    validate(createInvoiceSchema),
    createInvoice
);

export default router;