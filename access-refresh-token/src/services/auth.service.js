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

export const loginService = async (data) => {
    try {
        let { email, password} = data

        if (!email || !password) {
                return res.status(400).json({ message: "All the fields are required" })
            }
        
            // Checking user exists
            const user = await userModel.findOne({ 
                email 
            }).select("-password")
        
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
        
            let isPasswordValid = bcrypt.compareSync(password, user.password)

            if(!isPasswordValid){
                return res.status(401).json({ message: "Invalid credentials" })
            }
        
            let accessToken = generateAccessToken(user._id)
            let refreshToken = generateRefreshToken(user._id)

            return {
                accessToken, refreshToken, user
            }

    } catch (error) {
        throw new Error("Internal Server Error")
    }
}