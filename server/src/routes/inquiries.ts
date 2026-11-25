import { Router } from "express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { Inquiry } from "../models/Inquiry.js";
import { Puppy } from "../models/Puppy.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { ApiError } from "../middleware/errorHandler.js";
import { createInquirySchema, updateInquiryStatusSchema } from "../validators/schemas.js";

export const inquiriesRouter = Router();

const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many inquiry submissions. Please try again shortly or reach out on WhatsApp.",
  },
});

/** Public endpoint: Submit a showroom visit or puppy inquiry. */
inquiriesRouter.post("/", inquiryLimiter, async (req, res, next) => {
  try {
    const parsed = createInquirySchema.parse(req.body);

    let resolvedPuppyId: mongoose.Types.ObjectId | null = null;
    if (parsed.puppyId && mongoose.isValidObjectId(parsed.puppyId)) {
      resolvedPuppyId = new mongoose.Types.ObjectId(parsed.puppyId);
    } else if (parsed.puppySlug) {
      const matched = await Puppy.findOne({ slug: parsed.puppySlug.toLowerCase() })
        .select("_id")
        .lean();
      if (matched) {
        resolvedPuppyId = matched._id;
      }
    }

    const created = await Inquiry.create({
      fullName: parsed.fullName,
      email: parsed.email,
      whatsappNumber: parsed.whatsappNumber,
      inquiryType: parsed.inquiryType,
      puppyId: resolvedPuppyId,
      puppySlug: parsed.puppySlug ?? "",
      preferredBreed: parsed.preferredBreed ?? "",
      preferredDate: parsed.preferredDate ?? "",
      message: parsed.message,
    });

    res.status(201).json({
      success: true,
      message: "Thank you! Your inquiry has been received by our Dubai concierge team.",
      data: created,
    });
  } catch (err) {
    next(err);
  }
});

/** Admin: List all submitted inquiries. */
inquiriesRouter.get("/", requireAdmin, async (_req, res, next) => {
  try {
    const inquiries = await Inquiry.find()
      .populate("puppyId", "name title slug breed")
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (err) {
    next(err);
  }
});

/** Admin: Update inquiry follow-up status. */
inquiriesRouter.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const parsed = updateInquiryStatusSchema.parse(req.body);
    const updated = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: parsed.status },
      { new: true }
    ).lean();

    if (!updated) {
      throw new ApiError(404, "Inquiry not found");
    }

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    next(err);
  }
});

/** Admin: Delete an inquiry by id. */
inquiriesRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const deleted = await Inquiry.findByIdAndDelete(req.params.id).lean();
    if (!deleted) {
      throw new ApiError(404, "Inquiry not found");
    }

    res.json({
      success: true,
      message: "Inquiry deleted",
    });
  } catch (err) {
    next(err);
  }
});
