import { Router } from "express";
import { loginController, registerController } from "../controllers/auth.controller";

const authRouter = Router()

// Public route
authRouter.post("/register", registerController)

authRouter.post("/login", loginController)



export default authRouter