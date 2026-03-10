import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import { handleError } from "./middlewares/error.middleware.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
connectDB();

app.use(handleError)

export default app;