import { Router } from "express";
import { HappyFamily } from "../models/HappyFamily.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { createHappyFamilySchema } from "../validators/schemas.js";

export const happyFamiliesRouter = Router();

happyFamiliesRouter.get("/", async (req, res, next) => {
  try {
    const { featured, breed } = req.query;
    const filter: Record<string, unknown> = {};

    if (featured === "true") {
      filter.featuredOnHome = true;
    }
    if (typeof breed === "string" && breed.trim() && breed !== "all") {
      filter.puppyBreed = new RegExp(`^${breed.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
    }

    const families = await HappyFamily.find(filter)
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: families.length,
      data: families,
    });
  } catch (err) {
    next(err);
  }
});

happyFamiliesRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const parsed = createHappyFamilySchema.parse(req.body);
    const created = await HappyFamily.create(parsed);
    res.status(201).json({
      success: true,
      data: created,
    });
  } catch (err) {
    next(err);
  }
});

