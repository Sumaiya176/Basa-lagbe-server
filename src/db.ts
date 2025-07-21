import mongoose from "mongoose";
import config from "./config";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(config.database_url as string);
    isConnected = !!db.connections[0].readyState;
    console.log("✅ Database connected (Vercel)");
  } catch (error) {
    console.error("❌ Database connection failed", error);
    throw error;
  }
}
