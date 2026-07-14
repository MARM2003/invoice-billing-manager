import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { updateProfile } from "../../controllers/user.controller.js";
import { completeProfileSchema } from "../../validations/auth.validation.js"
import { validate } from "../../middleware/validate.middleware.js";
import upload from "../../middleware/upload.middleware.js";
const router = express.Router();

router.put(
  "/profile",
  authMiddleware,
  upload.single("logo"),
  validate(completeProfileSchema),
  updateProfile
);

export default router;