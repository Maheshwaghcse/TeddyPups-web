import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 5000),
  mongoUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/teddypups",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  adminSecret: process.env.ADMIN_SECRET ?? "teddypups-admin-2026",
  whatsappNumber: process.env.WHATSAPP_NUMBER ?? "971500000000",
};

