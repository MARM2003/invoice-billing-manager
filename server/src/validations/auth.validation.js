import { z } from "zod";
import { normalizeSpaces } from "../utils/string.util.js";

//register schema validation
export const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(4, "Name must be at least 4 characters")
      .max(40, "Name cannot exceed 40 characters")
      .regex(
        /^[A-Za-z\s]+$/,
        "Name can contain only letters and spaces"
      ),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email"),

    companyName: z
      .string()
      .transform(normalizeSpaces)
      .pipe(
        z
          .string()
          .min(2, "Company name must be at least 2 characters")
          .max(50, "Company name cannot exceed 50 characters")
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(18, "Password cannot exceed 18 characters")
      .regex(/[A-Z]/, "Password must contain one uppercase letter")
      .regex(/[a-z]/, "Password must contain one lowercase letter")
      .regex(/[0-9]/, "Password must contain one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain one special character"
      ),
  })

});

//login schema validation
export const loginSchema = z.object({

  body: z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email"),

    password: z
      .string()
      .min(8)
      .max(18),
  })


});

//complete profile schema
export const completeProfileSchema = z
  .object({
    body: z.object({
      phone: z
        .string({
          required_error: "Phone number is required",
        })
        .trim()
        .regex(/^[0-9]{10,15}$/, "Phone number must contain 10 to 15 digits"),

      addressLine1: z
        .string({
          required_error: "Address Line 1 is required",
        })
        .trim()
        .min(5, "Address Line 1 must be at least 5 characters")
        .max(100, "Address Line 1 cannot exceed 100 characters"),

      addressLine2: z
        .string()
        .trim()
        .max(100, "Address Line 2 cannot exceed 100 characters")
        .optional(),

      city: z
        .string({
          required_error: "City is required",
        })
        .trim()
        .min(2, "City must be at least 2 characters")
        .max(50, "City cannot exceed 50 characters"),

      state: z
        .string({
          required_error: "State is required",
        })
        .trim()
        .min(2, "State must be at least 2 characters")
        .max(50, "State cannot exceed 50 characters"),

      country: z
        .string({
          required_error: "Country is required",
        })
        .trim()
        .min(2, "Country must be at least 2 characters")
        .max(50, "Country cannot exceed 50 characters"),

      postalCode: z
        .string({
          required_error: "Postal Code is required",
        })
        .trim()
        .min(4, "Postal Code must be at least 4 characters")
        .max(10, "Postal Code cannot exceed 10 characters"),

      isGstRegistered: z.preprocess(
        (value) => {
          if (value === "true") return true;
          if (value === "false") return false;
          return value;
        },
        z.boolean()
      ),

      gstNumber: z
        .string()
        .trim()
        .transform((value) => value.toUpperCase())
        .optional(),
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
              message: "Invalid GST Number",
            });
          }
        }
      })

  });