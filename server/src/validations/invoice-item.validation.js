import { z } from "zod";

export const invoiceItemSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required.")
    .max(255, "Description cannot exceed 255 characters."),

  quantity: z
    .number({
      required_error: "Quantity is required.",
      invalid_type_error: "Quantity must be a number.",
    })
    .int("Quantity must be a whole number.")
    .positive("Quantity must be greater than 0."),

  unitPrice: z
    .number({
      required_error: "Unit price is required.",
      invalid_type_error: "Unit price must be a number.",
    })
    .min(0, "Unit price cannot be negative."),

  taxRate: z
    .number({
      invalid_type_error: "Tax rate must be a number.",
    })
    .min(0, "Tax rate cannot be negative.")
    .default(0),
});