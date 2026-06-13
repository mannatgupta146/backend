import userModel from "../models/user.model";
import bcrypt from "bcrypt"

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

    return res.status(201).json({ message: "User created successfully", user })

}

export const loginController = async (req, res) => {
}

export default { registerController, loginController }