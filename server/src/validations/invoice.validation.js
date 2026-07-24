// server/src/validations/invoice.validation.js

import { z } from "zod";
import { invoiceItemSchema } from "./invoice-item.validation.js";

const optionalString = z.string().trim().optional().or(z.literal(""));

const invoiceStatusEnum = [
    "DRAFT",
    "SENT",
    "PAID",
    "PARTIALLY_PAID",
    "OVERDUE",
    "CANCELLED",
];

export const createInvoiceSchema = z.object({
    body: z
        .object({
            customerId: z
                .string()
                .trim()
                .uuid("Invalid customer ID."),

            issueDate: z.coerce.date(),

            dueDate: z.coerce.date(),

            status: z.enum(invoiceStatusEnum),

            notes: optionalString,

            items: z
                .array(invoiceItemSchema)
                .min(1, "At least one invoice item is required."),
        })
        .refine((data) => data.dueDate >= data.issueDate, {
            message: "Due date must be on or after the issue date.",
            path: ["dueDate"],
        }),
});