import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"

export const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
      return res.status(401).json({
        message: "No token found",
      })
    }

    let decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
      })
    }

    let user = await userModel.findById(decoded.id)

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    req.user = user

    next()
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
