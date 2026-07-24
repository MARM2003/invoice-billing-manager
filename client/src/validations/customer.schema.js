import { z } from "zod";

const optionalString = (maxLength) =>
    z.preprocess(
        (value) => {
            if (typeof value !== "string") return undefined;

            const trimmed = value.trim();

            return trimmed === "" ? undefined : trimmed;
        },
        z.string().max(maxLength).optional()
    );

export const customerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Customer name must be at least 3 characters")
        .max(100, "Customer name cannot exceed 100 characters"),

    companyName: optionalString(100),

    email: z.preprocess(
        (value) => {
            if (typeof value !== "string") return undefined;

            const trimmed = value.trim();

            return trimmed === "" ? undefined : trimmed;
        },
        z.string().email("Please enter a valid email address").optional()
    ),

    phone: z.preprocess(
        (value) => {
            if (typeof value !== "string") return undefined;

            const trimmed = value.trim();

            return trimmed === "" ? undefined : trimmed;
        },
        z
            .string()
            .regex(
                /^[0-9+\-\s()]{10,15}$/,
                "Phone number must be between 10 and 15 characters"
            )
            .optional()
    ),

    gstNumber: optionalString(30),

    taxId: optionalString(50),

    billingAddress: optionalString(500),

    shippingAddress: optionalString(500),

    notes: optionalString(1000),

    isActive: z.boolean().default(true),
});