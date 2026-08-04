import { z } from "zod";
import { invoiceItemSchema } from "./invoice-item.schema.js";

const optionalString = z.string().trim().optional().or(z.literal(""));

const invoiceStatusEnum = [
    "DRAFT",
    "SENT",
    "PAID",
    "PARTIALLY_PAID",
    "OVERDUE",
    "CANCELLED",
];

export const invoiceSchema = z
    .object({
        customerId: z
            .string()
            .trim()
            .min(1, "Customer is required."),

        issueDate: z
            .string()
            .min(1, "Issue date is required."),

        dueDate: z
            .string()
            .min(1, "Due date is required."),

        status: z.enum(invoiceStatusEnum),

        notes: optionalString,

        items: z
            .array(invoiceItemSchema)
            .min(1, "At least one invoice item is required."),
    })
    .refine(
        (data) =>
            new Date(data.dueDate) >=
            new Date(data.issueDate),
        {
            message:
                "Due date must be on or after the issue date.",
            path: ["dueDate"],
        }
    );