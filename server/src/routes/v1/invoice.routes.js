import express from "express"
import { validate } from "../../middleware/validate.middleware.js"
import authMiddleware from "../../middleware/auth.middleware.js"
import { createInvoiceSchema, updateInvoiceSchema } from "../../validations/invoice.validation.js"
import { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice } from "../../controllers/invoice.controller.js"
const router = express.Router();


router.post(
    "/",
    authMiddleware,
    validate(createInvoiceSchema),
    createInvoice
);

router.get("/", authMiddleware, getInvoices)

router.get("/:id", authMiddleware, getInvoiceById)

router.put("/:id", authMiddleware, validate(updateInvoiceSchema), updateInvoice)

router.delete("/:id", authMiddleware, deleteInvoice)
export default router;