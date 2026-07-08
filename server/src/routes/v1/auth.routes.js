import express from "express"
//importing the controllers
import { register, login } from "../../controllers/auth.controller.js"

//created a router app
const router = express.Router()

//POST /api/v1/auth/register
router.post("/register", register)

//POST /api/v1/auth/login
router.post("/login", login)


export default router