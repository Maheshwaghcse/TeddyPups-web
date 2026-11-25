import mongoose, { Schema, type InferSchemaType } from "mongoose";

const happyFamilySchema = new Schema(
  {
    caption: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    tapeColor: { type: String, default: "rgba(244, 224, 185, 0.85)" },
    tiltDeg: { type: Number, default: -2 },
    puppyBreed: { type: String, required: true, trim: true },
    location: { type: String, default: "Dubai, UAE", trim: true },
    testimonialQuote: { type: String, default: "", trim: true },
    clientName: { type: String, default: "", trim: true },
    featuredOnHome: { type: Boolean, default: false, index: true },
    displayOrder: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export type HappyFamilyDocument = InferSchemaType<typeof happyFamilySchema>;
export const HappyFamily = mongoose.model("HappyFamily", happyFamilySchema);

