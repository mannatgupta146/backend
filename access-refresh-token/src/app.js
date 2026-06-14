import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import homeRouter from "./routes/home.route.js"
import { authMiddleware } from "./middlewares/auth.middleware.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

// App routes
app.use("/api/auth", authRouter)
app.use("/api/home", authMiddleware, homeRouter)

export default app
