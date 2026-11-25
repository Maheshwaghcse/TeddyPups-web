import mongoose, { Schema, type InferSchemaType } from "mongoose";

const healthChecksSchema = new Schema(
  {
    vaccinated: { type: Boolean, default: true },
    dewormed: { type: Boolean, default: true },
    vetCertificate: { type: Boolean, default: true },
    microchipped: { type: Boolean, default: true },
  },
  { _id: false }
);

const puppySchema = new Schema(
  {
    name: { type: String, trim: true, default: "" },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    breed: { type: String, required: true, trim: true, index: true },
    gender: {
      type: String,
      enum: ["boy", "girl", "boy & girl"],
      required: true,
    },
    ageMonths: { type: Number, required: true, min: 1, max: 24 },
    ageLabel: { type: String, required: true, trim: true },
    origin: {
      type: String,
      enum: ["dubai", "korea"],
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["available", "reserved", "gone-home"],
      default: "available",
      index: true,
    },
    hasVideo: { type: Boolean, default: false },
    doorColor: { type: String, default: "#C97538" },
    defaultDoorOpen: { type: Boolean, default: false },
    priceAed: { type: Number, required: true, min: 0 },
    color: { type: String, required: true, trim: true },
    expectedAdultWeight: { type: String, required: true, trim: true },
    images: { type: [String], required: true, default: [] },
    videoUrl: { type: String, default: "" },
    description: { type: String, required: true, trim: true },
    personalityTags: { type: [String], default: [] },
    healthChecks: { type: healthChecksSchema, default: () => ({}) },
    featuredOnHome: { type: Boolean, default: false, index: true },
    displayOrder: { type: Number, default: 100 },
  },
  { timestamps: true }
);

puppySchema.index({ title: "text", name: "text", breed: "text", description: "text" });

export type PuppyDocument = InferSchemaType<typeof puppySchema>;
export const Puppy = mongoose.model("Puppy", puppySchema);

