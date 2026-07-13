import { registerUser, loginUser } from "../services/auth.service.js";

//register controller
export const register = async (req, res) => {
    try {
        //register result
        const result = await registerUser(req.body)
        return res.status(201).json({
            success: true,
            message: "User registered Successfully",
            data: result
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

//login controller

export const login = async (req, res) => {

    try {

        //destructuring the data
        const { email, password } = req.body
        //fetching the result
        const result = await loginUser(email, password);

        // Set Refresh Token Cookie
        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path:"/",
            maxAge: 5 * 24 * 60 * 60 * 1000, // 5 Days
        });

        //returining the res
        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            data: {
                user:result.user,
                accessToken:result.token
            }
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }



}