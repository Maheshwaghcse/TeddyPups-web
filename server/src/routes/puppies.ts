import { Router } from "express";
import { Puppy } from "../models/Puppy.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { ApiError } from "../middleware/errorHandler.js";
import { createPuppySchema, updatePuppySchema } from "../validators/schemas.js";

export const puppiesRouter = Router();

/** List puppies with optional filters: origin, status, breed, gender, featured, search. */
puppiesRouter.get("/", async (req, res, next) => {
  try {
    const { origin, status, breed, gender, featured, search } = req.query;

    const filter: Record<string, unknown> = {};

    if (typeof origin === "string" && ["dubai", "korea"].includes(origin)) {
      filter.origin = origin;
    }
    if (typeof status === "string" && ["available", "reserved", "gone-home"].includes(status)) {
      filter.status = status;
    }
    if (typeof breed === "string" && breed.trim() && breed !== "all") {
      filter.breed = new RegExp(`^${escapeRegExp(breed.trim())}$`, "i");
    }
    if (typeof gender === "string" && ["boy", "girl", "boy & girl"].includes(gender)) {
      filter.gender = gender;
    }
    if (featured === "true") {
      filter.featuredOnHome = true;
    }
    if (typeof search === "string" && search.trim()) {
      const regex = new RegExp(escapeRegExp(search.trim()), "i");
      filter.$or = [{ name: regex }, { title: regex }, { breed: regex }, { color: regex }];
    }

    const puppies = await Puppy.find(filter).sort({ displayOrder: 1, createdAt: -1 }).lean();

    res.json({
      success: true,
      count: puppies.length,
      data: puppies,
    });
  } catch (err) {
    next(err);
  }
});

/** Return distinct breeds with available counts for filter dropdowns. */
puppiesRouter.get("/breeds", async (_req, res, next) => {
  try {
    const breeds = await Puppy.aggregate([
      {
        $group: {
          _id: "$breed",
          total: { $sum: 1 },
          availableCount: {
            $sum: { $cond: [{ $eq: ["$status", "available"] }, 1, 0] },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: breeds.map((b) => ({
        breed: b._id,
        total: b.total,
        availableCount: b.availableCount,
      })),
    });
  } catch (err) {
    next(err);
  }
});

/** Fetch a single puppy by slug plus up to 3 related puppies. */
puppiesRouter.get("/:slug", async (req, res, next) => {
  try {
    const puppy = await Puppy.findOne({ slug: req.params.slug.toLowerCase() }).lean();
    if (!puppy) {
      throw new ApiError(404, "Puppy not found");
    }

    const related = await Puppy.find({
      _id: { $ne: puppy._id },
      status: "available",
    })
      .sort({ displayOrder: 1 })
      .limit(3)
      .lean();

    res.json({
      success: true,
      data: {
        puppy,
        related,
      },
    });
  } catch (err) {
    next(err);
  }
});

/** Admin: Create a new puppy listing. */
puppiesRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const parsed = createPuppySchema.parse(req.body);
    const created = await Puppy.create(parsed);
    res.status(201).json({
      success: true,
      data: created,
    });
  } catch (err) {
    next(err);
  }
});

/** Admin: Update an existing puppy listing by id. */
puppiesRouter.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const parsed = updatePuppySchema.parse(req.body);
    const updated = await Puppy.findByIdAndUpdate(req.params.id, parsed, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      throw new ApiError(404, "Puppy not found");
    }

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    next(err);
  }
});

/** Admin: Delete a puppy listing by id. */
puppiesRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const deleted = await Puppy.findByIdAndDelete(req.params.id).lean();
    if (!deleted) {
      throw new ApiError(404, "Puppy not found");
    }

    res.json({
      success: true,
      message: "Puppy deleted",
    });
  } catch (err) {
    next(err);
  }
});

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

