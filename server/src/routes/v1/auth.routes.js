import express from "express"
//importing the controllers
import { register, login } from "../../controllers/auth.controller.js"
//importing the validation middleware
import { validate } from "../../middleware/validate.middleware.js"
//importing the schema validation
import { registerSchema,loginSchema } from "../../validations/auth.validation.js"
//created a router app
const router = express.Router()

//POST /api/v1/auth/register
router.post("/register",validate(registerSchema), register)

//POST /api/v1/auth/login
router.post("/login", validate(loginSchema),login)


export default router