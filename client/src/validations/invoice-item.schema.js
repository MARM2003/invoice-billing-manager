import { z } from "zod";

export const invoiceItemSchema = z.object({
    description: z
        .string()
        .trim()
        .min(1, "Description is required.")
        .max(255, "Description cannot exceed 255 characters."),

    quantity: z.coerce
        .number()
        .int("Quantity must be a whole number.")
        .positive("Quantity must be greater than 0."),

    unitPrice: z.coerce
        .number()
        .min(0, "Unit price cannot be negative."),

    taxRate: z.coerce
        .number()
        .min(0, "Tax rate cannot be negative.")
        .default(0),
});