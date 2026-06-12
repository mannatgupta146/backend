import "dotenv/config"
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan"
import Redis from "ioredis";
import User from "./models/user.model.js"
import rateLimit from "express-rate-limit"

// ---- MONGODB CONNECTION ----

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

connectToMongoDB()


// ---- REDIS CONNECTION ----

const redis = new Redis(process.env.REDIS_URL);
redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});


// ---- EXPRESS APP ----

const app = express();

app.use(morgan("dev"))
app.use(express.json())


const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100, 
  message: {
    error: "Too many requests from this IP, please try again later."
  },
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(globalLimiter)


// ---- Routes ----

app.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const userFromCache = await redis.get(`user: ${id}`)
        if(userFromCache){
            return res.json({
                message: "User fetched from cache",
                success: true,
                data: JSON.parse(userFromCache)
            })
        }

        const user = await User.findOne(id)

        await redis.set(`user: ${id}`, JSON.stringify(user), "EX", 3600)

        res.status(200).json({ 
            message: "User fetched successfully",
            success: true, 
            data: user 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post("/user", async (req, res) => {
   try {
    const {name, email} = req.body

    const user = await User.create({name, email})
    await user.save()

    res.status(200).json({
        success: true,
        message: "User created successfully",
        data: user
    })
   } catch (error) {
    res.status(500).json({success: false, error: error.message})
   }
})

app.get("/", async (req, res) => {
  let sum = 0
  for(let i = 0; i < 1000000; i++) {
    sum +=i
  }

  res.json({
    message: "Sum calculated",
    data: sum
  })
})

// ---- Server start ----

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});