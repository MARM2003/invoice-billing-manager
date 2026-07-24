import { z } from "zod";

// ==============================
// Regular Expressions
// ==============================

const phoneRegex = /^[0-9]{10,15}$/;

const gstRegex =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

// ==============================
// Helper
// Converts "" to undefined
// ==============================

const optionalString = (schema) =>
  z.preprocess(
    (value) => (value === "" ? undefined : value),
    schema.optional()
  );

// ==============================
// Create Customer Schema
// ==============================

export const createCustomerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Customer name must be at least 2 characters.")
      .max(100, "Customer name cannot exceed 100 characters."),

    companyName: optionalString(
      z
        .string()
        .trim()
        .max(150, "Company name cannot exceed 150 characters.")
    ),

    email: optionalString(
      z
        .string()
        .trim()
        .email("Please enter a valid email address.")
    ),

    phone: optionalString(
      z
        .string()
        .trim()
        .regex(phoneRegex, "Phone number must contain 10 to 15 digits.")
    ),

    gstNumber: optionalString(
      z
        .string()
        .trim()
        .toUpperCase()
        .regex(gstRegex, "Please enter a valid GST number.")
    ),

    taxId: optionalString(
      z
        .string()
        .trim()
        .max(50, "Tax ID cannot exceed 50 characters.")
    ),

    billingAddress: optionalString(
      z
        .string()
        .trim()
        .max(500, "Billing address cannot exceed 500 characters.")
    ),

    shippingAddress: optionalString(
      z
        .string()
        .trim()
        .max(500, "Shipping address cannot exceed 500 characters.")
    ),

    notes: optionalString(
      z
        .string()
        .trim()
        .max(1000, "Notes cannot exceed 1000 characters.")
    ),

     isActive: z.boolean().optional(),
  }),
});

// ==============================
// Update Customer Schema
// ==============================

export const updateCustomerSchema = z.object({
  body: createCustomerSchema.shape.body.partial(),
});