import { Router } from "express";
import { FaqItem } from "../models/FaqItem.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { createFaqSchema } from "../validators/schemas.js";

export const faqsRouter = Router();

faqsRouter.get("/", async (req, res, next) => {
  try {
    const { featured, category, search } = req.query;
    const filter: Record<string, unknown> = {};

    if (featured === "true") {
      filter.featuredOnHome = true;
    }
    if (
      typeof category === "string" &&
      ["health", "adoption", "import", "visiting", "delivery"].includes(category)
    ) {
      filter.category = category;
    }
    if (typeof search === "string" && search.trim()) {
      const regex = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [{ question: regex }, { answer: regex }];
    }

    const faqs = await FaqItem.find(filter).sort({ displayOrder: 1, createdAt: 1 }).lean();

    res.json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (err) {
    next(err);
  }
});

faqsRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const parsed = createFaqSchema.parse(req.body);
    const created = await FaqItem.create(parsed);
    res.status(201).json({
      success: true,
      data: created,
    });
  } catch (err) {
    next(err);
  }
});

