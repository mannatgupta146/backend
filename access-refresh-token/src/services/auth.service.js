import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js"

export const registerService = async (data) => {
  try {
    let { email, password, name } = data

    if (!email || !password || !name) {
        throw new Error("All fields are required")
    }

    // Checking user exists
    const userExists = await userModel.findOne({ email })

    if (userExists) {
      throw new Error("User already exists")
    }

    let hasPassword = bcrypt.hashSync(password, 10)

    let newUser = await userModel.create({
      name,
      email,
      password: hasPassword,
    })

    let accessToken = generateAccessToken(newUser._id)
    let refreshToken = generateRefreshToken(newUser._id)

    return {
      accessToken,
      refreshToken,
      newUser,
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const loginService = async (data) => {
  try {
    let { email, password } = data

    if (!email || !password) {
      throw new Error("All fields are required")
    }

    // Checking user exists
    const user = await userModel.findOne({
      email,
    })

    if (!user) {
      throw new Error("User not found")
    }

    let isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
      throw new Error("Invalid credentials")
    }

    let accessToken = generateAccessToken(user._id)
    let refreshToken = generateRefreshToken(user._id)

    return {
      accessToken,
      refreshToken,
      user,
    }
  } catch (error) {
    throw new Error(error)
  }
}
