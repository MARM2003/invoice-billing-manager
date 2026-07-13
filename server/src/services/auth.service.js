import bcrypt from "bcryptjs";
import prisma from "../prismaClient/prismaClient.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

//register logic
export const registerUser = async (userData) => {
    //destructing the data
    const { name, email, password, companyName } = userData;

    //checking for existing user
    const existingUser = await prisma.user.findUnique(
        {
            where: {
                email,
            },
        }
    )
    //if user exist then throw error
    if (existingUser) throw new Error("User already exists")

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10)

    //creating the user registeration data
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            companyName
        },
    })

    //token generation
    const token = generateAccessToken(user.id);
    //returning the token. 
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            company_name: user.companyName,
        },
        token
    }
}

//login logic
export const loginUser = async (email, password) => {
    //finding the user
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    //if no user find
    if (!user) throw new Error("Invalid credentials")

    //comparing the password.
    const isMatch = await bcrypt.compare(password, user.password)

    //if password not match
    if (!isMatch) throw new Error("Invalid credentials")

    //token generation
    const token = generateAccessToken(user.id);
    //refresh token
    const refreshToken = generateRefreshToken(user.id)


    //returning the token. 
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            company_name: user.companyName,
            profilestatus: user.profileCompleted
        },
        token,
        refreshToken
    }

}