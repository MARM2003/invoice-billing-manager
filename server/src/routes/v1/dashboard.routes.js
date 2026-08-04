import express from "express"

import authMiddleware from "../../middleware/auth.middleware.js"

import { dashBoardController } from "../../controllers/dashboard.controller.js"

const router = express.Router();

router.get("/", authMiddleware, dashBoardController)


export default router