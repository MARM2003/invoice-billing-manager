import { z } from "zod";

export const updateProfileSchema = z
    .object({
        body: z.object({
            name: z
                .string()
                .trim()
                .min(2, "Name must be at least 2 characters")
                .max(100, "Name cannot exceed 100 characters"),

            email: z
                .string()
                .trim()
                .email("Please enter a valid email address"),

            companyName: z
                .string()
                .trim()
                .min(2, "Company name must be at least 2 characters")
                .max(150, "Company name cannot exceed 150 characters"),

            phone: z
                .string()
                .trim()
                .regex(
                    /^[0-9]{10}$/,
                    "Phone number must contain exactly 10 digits"
                ),

            addressLine1: z
                .string()
                .trim()
                .min(3, "Address Line 1 is required")
                .max(255),

            addressLine2: z
                .string()
                .trim()
                .max(255)
                .optional()
                .or(z.literal("")),

            city: z
                .string()
                .trim()
                .min(2, "City is required")
                .max(100),

            state: z
                .string()
                .trim()
                .min(2, "State is required")
                .max(100),

            country: z
                .string()
                .trim()
                .min(2, "Country is required")
                .max(100),

            postalCode: z
                .string()
                .trim()
                .min(3, "Postal code is required")
                .max(20),

            isGstRegistered: z.boolean(),

            gstNumber: z
                .string()
                .trim()
                .max(20)
                .optional()
                .or(z.literal("")),

            panNumber: z
                .string()
                .trim()
                .max(10)
                .optional()
                .or(z.literal("")),

            bankName: z
                .string()
                .trim()
                .max(150)
                .optional()
                .or(z.literal("")),

            accountHolderName: z
                .string()
                .trim()
                .max(150)
                .optional()
                .or(z.literal("")),

            accountNumber: z
                .string()
                .trim()
                .regex(
                    /^\d*$/,
                    "Account number must contain only digits"
                )
                .max(30)
                .optional()
                .or(z.literal("")),

            ifscCode: z
                .string()
                .trim()
                .toUpperCase()
                .regex(
                    /^$|^[A-Z]{4}0[A-Z0-9]{6}$/,
                    "Please enter a valid IFSC code"
                )
                .optional()
                .or(z.literal("")),

            upiId: z
                .string()
                .trim()
                .regex(
                    /^$|^[\w.-]+@[\w.-]+$/,
                    "Please enter a valid UPI ID"
                )
                .optional()
                .or(z.literal("")),
        })
            .superRefine((data, ctx) => {
                if (
                    data.isGstRegistered &&
                    !data.gstNumber?.trim()
                ) {
                    ctx.addIssue({
                        code: "custom",
                        path: ["gstNumber"],
                        message:
                            "GST number is required when GST is registered",
                    });
                }
            })
    })