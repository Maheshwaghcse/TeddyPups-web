import { Router } from "express";
import mongoose from "mongoose";
import { puppiesRouter } from "./puppies.js";
import { happyFamiliesRouter } from "./happyFamilies.js";
import { faqsRouter } from "./faqs.js";
import { inquiriesRouter } from "./inquiries.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  const dbReady = mongoose.connection.readyState === 1;
  res.status(dbReady ? 200 : 503).json({
    success: dbReady,
    service: "teddypups-api",
    database: dbReady ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

apiRouter.use("/puppies", puppiesRouter);
apiRouter.use("/happy-families", happyFamiliesRouter);
apiRouter.use("/faqs", faqsRouter);
apiRouter.use("/inquiries", inquiriesRouter);

