import { z } from "zod";

export const createManualPaymentSchema = z.object({
    body: z.object({
        invoiceId: z
            .string()
            .uuid("Invalid invoice ID"),

        customerId: z
            .string()
            .uuid("Invalid customer ID"),

        amount: z.coerce
            .number()
            .positive("Payment amount must be greater than 0"),

        method: z.enum(
            ["CASH", "UPI", "BANK_TRANSFER"],
            {
                errorMap: () => ({
                    message: "Payment method must be CASH, UPI, or BANK_TRANSFER",
                }),
            }
        ),

        transactionId: z
            .string()
            .trim()
            .optional(),

        reference: z
            .string()
            .trim()
            .max(255, "Reference cannot exceed 255 characters")
            .optional(),

        notes: z
            .string()
            .trim()
            .max(500, "Notes cannot exceed 500 characters")
            .optional(),
    })
});