import { z } from "zod";
import { normalizeSpaces } from "../utils/string.util.js";
export const registerSchema = z.object({
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
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8)
    .max(18),
});