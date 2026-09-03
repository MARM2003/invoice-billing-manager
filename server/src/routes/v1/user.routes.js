import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { updateProfile, getUserProfile, updateUserProfile, updateUserLogo } from "../../controllers/user.controller.js";
import { completeProfileSchema } from "../../validations/auth.validation.js"
import { updateProfileSchema } from "../../validations/user.validation.js"
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

router.get(
  "/profile",
  authMiddleware,
  getUserProfile
);

router.put(
  "/user-profile",
  authMiddleware,
  validate(updateProfileSchema),
  updateUserProfile
);

router.put("/user-logo",
  authMiddleware,
  upload.single("logo"),
  updateUserLogo
)

export default router;