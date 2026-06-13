import userModel from "../models/user.model";
import bcrypt from "bcrypt"
import { generateAccessToken } from "../utils/generateToken";

export const registerService = async (data) => {
    try {
        let { email, password, name } = data

        if (!email || !password || !name) {
                return res.status(400).json({ message: "All the fields are required" })
            }
        
            // Checking user exists
            const userExists = await userModel.findOne({ email });
        
            if (userExists) {
                return res.status(409).json({ message: "User already exists" })
            }
        
            let hasPassword = bcrypt.hashSync(password, 10)
        
            let newUser = await userModel.create({
                name,
                email,
                password: hasPassword
            })
        
            let accessToken = generateAccessToken(newUser._id)
            let refreshToken = generateRefreshToken(newUser._id)

            return {
                accessToken, refreshToken, newUser
            }

    } catch (error) {
        throw new Error("Internal Server Error")
    }
}