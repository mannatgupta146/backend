import { Router } from "express";
import { getAccessTokenController, loginController, registerController } from "../controllers/auth.controller.js";

const authRouter = Router()

// Public route
authRouter.post("/register", registerController)

authRouter.post("/login", loginController)

authRouter.get("/get-accessToken", getAccessTokenController)

export default authRouter