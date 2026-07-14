import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const profileSchema = z
  .object({
    phone: z
      .string()
      .trim()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number cannot exceed 15 digits")
      .regex(/^[0-9]+$/, "Phone number must contain only digits"),

    addressLine1: z
      .string()
      .trim()
      .min(5, "Address Line 1 must be at least 5 characters")
      .max(100, "Address Line 1 cannot exceed 100 characters"),

    addressLine2: z
      .string()
      .trim()
      .max(100, "Address Line 2 cannot exceed 100 characters")
      .optional()
      .or(z.literal("")),

    city: z
      .string()
      .trim()
      .min(2, "City is required")
      .max(50, "City cannot exceed 50 characters"),

    state: z
      .string()
      .trim()
      .min(2, "State is required")
      .max(50, "State cannot exceed 50 characters"),

    country: z
      .string()
      .trim()
      .min(2, "Country is required")
      .max(50, "Country cannot exceed 50 characters"),

    postalCode: z
      .string()
      .trim()
      .min(4, "Postal Code is required")
      .max(10, "Postal Code cannot exceed 10 characters"),

    isGstRegistered: z.boolean(),

    gstNumber: z
      .string()
      .trim()
      .transform((value) => value.toUpperCase())
      .optional()
      .or(z.literal("")),

    logo: z
      .any()
      .optional()
      .refine(
        (file) => !file || file.size <= MAX_FILE_SIZE,
        "Logo size must be less than 2 MB"
      )
      .refine(
        (file) =>
          !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only JPG, JPEG and PNG images are allowed"
      ),
  })
  .superRefine((data, ctx) => {
  if (data.isGstRegistered) {
    if (!data.gstNumber || data.gstNumber.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["gstNumber"],
        message: "GST Number is required",
      });
      return;
    }

    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

    if (!gstRegex.test(data.gstNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["gstNumber"],
        message: "Please enter a valid GST Number",
      });
    }
  }
});