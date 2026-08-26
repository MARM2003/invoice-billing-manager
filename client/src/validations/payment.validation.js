import { z } from "zod";

export const createManualPaymentSchema = (
    outstandingAmount
) =>
    z
        .object({
            amount: z
                .string()
                .trim()
                .min(
                    1,
                    "Payment amount is required"
                )
                .refine(
                    (value) =>
                        !Number.isNaN(Number(value)),
                    "Payment amount must be a valid number"
                )
                .refine(
                    (value) => Number(value) > 0,
                    "Payment amount must be greater than 0"
                ),

            method: z.enum(
                [
                    "CASH",
                    "UPI",
                    "BANK_TRANSFER",
                    "CARD",
                    "OTHER",
                ],
                {
                    error:
                        "Please select a payment method",
                }
            ),

            transactionId: z
                .string()
                .trim()
                .max(
                    100,
                    "Transaction ID cannot exceed 100 characters"
                )
                .optional(),

            reference: z
                .string()
                .trim()
                .max(
                    255,
                    "Reference cannot exceed 255 characters"
                )
                .optional(),

            notes: z
                .string()
                .trim()
                .max(
                    500,
                    "Notes cannot exceed 500 characters"
                )
                .optional(),
        })
        .superRefine((data, ctx) => {
            const paymentAmount =
                Number(data.amount);

            if (
                !Number.isNaN(paymentAmount) &&
                paymentAmount >
                Number(outstandingAmount)
            ) {
                ctx.addIssue({
                    code: "custom",
                    path: ["amount"],
                    message: `Payment amount cannot exceed outstanding amount of ₹${Number(
                        outstandingAmount
                    ).toFixed(2)}`,
                });
            }
        });