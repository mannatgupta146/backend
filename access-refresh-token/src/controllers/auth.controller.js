import { loginService, registerService } from "../services/auth.service.js"

export const registerController = async (req, res) => {
  let { accessToken, refreshToken, newUser } = await registerService(req.body)

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000, // 10 min
  })
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })

  return res.status(201).json({
    message: "User created successfully",
    newUser,
  })
}

export const loginController = async (req, res) => {
  let { accessToken, refreshToken, user } = await loginService(req.body)

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000, // 10 min
  })
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })

  return res.status(200).json({
    message: "User logged in successfully",
    user,
  })
}

export default { registerController, loginController }
