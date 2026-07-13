import express from "express"
//importing the controllers
import { register, login, logout, refreshAccessToken } from "../../controllers/auth.controller.js"
//importing the validation middleware
import { validate } from "../../middleware/validate.middleware.js"
//importing the schema validation
import { registerSchema, loginSchema } from "../../validations/auth.validation.js"
//importing the token middleware
import authMiddleware from "../../middleware/auth.middleware.js";

//created a router app
const router = express.Router()

//POST /api/v1/auth/register
router.post("/register", validate(registerSchema), register)

//POST /api/v1/auth/login
router.post("/login", validate(loginSchema), login)

//POST /api/v1/auth/logout
router.post("/logout", authMiddleware, logout)

//POST /api/v1/auth/refresh
router.post("/refresh", refreshAccessToken)


export default router