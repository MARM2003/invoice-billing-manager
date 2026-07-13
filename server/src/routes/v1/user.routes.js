import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { updateProfile } from "../../controllers/user.controller.js";
import upload from "../../middleware/upload.middleware.js";
const router = express.Router();

router.put(
  "/profile",
  authMiddleware,
  upload.single("logo"),   
  updateProfile
);

export default router;