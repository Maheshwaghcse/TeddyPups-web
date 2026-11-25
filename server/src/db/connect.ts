import mongoose from "mongoose";
import { env } from "../config/env.js";

export async function connectDb(): Promise<typeof mongoose> {
  mongoose.set("strictQuery", true);
  const conn = await mongoose.connect(env.mongoUri);
  console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  return conn;
}

export async function disconnectDb(): Promise<void> {
  await mongoose.disconnect();
}

