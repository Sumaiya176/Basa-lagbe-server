import mongoose from "mongoose";
import config from "./config";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  if (!config.database_url) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    const db = await mongoose.connect(config.database_url as string);
    isConnected = !!db.connections[0].readyState;
    console.log("✅ Database connected (Vercel)");
  } catch (error) {
    console.error("❌ Database connection failed", error);
    throw error;
  }
}
