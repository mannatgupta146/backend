import { registerService } from "../services/auth.service";

export const registerController = async (req, res) => {
    
    let result = await registerService(req.body)
    let { accessToken, refreshToken, newUser } = result

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