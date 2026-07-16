import express from "express"
import { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer } from "../../controllers/customer.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js"
import { validate } from "../../middleware/validate.middleware.js"
import { createCustomerSchema, updateCustomerSchema } from "../../validations/customer.validation.js"
const router = express.Router()

// Customers Routes
// POST api/v1/customers/
router.post("/", authMiddleware, validate(createCustomerSchema), createCustomer);

// GET api/v1/customers/
router.get("/", authMiddleware, getCustomers);

// GET api/v1/customers/:id
router.get("/:id", authMiddleware, getCustomerById);

// PUT api/v1/customers/:id
router.put("/:id", authMiddleware, validate(updateCustomerSchema), updateCustomer);

// DELETE api/v1/customers/:id
router.delete("/:id", authMiddleware, deleteCustomer);

export default router;