import "dotenv/config"
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan"

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


// ---- EXPRESS APP ----

const app = express();

app.use(morgan("dev"))
app.use(express.json())


// ---- Server start ----

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});