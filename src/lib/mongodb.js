import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

if (!MONGODB_URL) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.error("mongodb connected error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
