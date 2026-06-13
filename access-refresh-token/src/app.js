import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.route"

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

// App routes
app.use("/api/auth", authRouter)

export default app