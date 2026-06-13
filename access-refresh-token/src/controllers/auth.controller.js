import userModel from "../models/user.model";
import bcrypt from "bcrypt"
import { generateAccessToken } from "../utils/generateToken";

export const registerController = async (req, res) => {
    let { name, email, password } = req.body;

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

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 10 * 60 * 1000 // 10 min
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    return res.status(201).json({
        message: "User created successfully",
        newUser
    })

}

export const loginController = async (req, res) => {
}

export default { registerController, loginController }