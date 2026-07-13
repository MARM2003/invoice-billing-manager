import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const profileSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),

  address: z
    .string()
    .trim()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address cannot exceed 200 characters"),

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
});