import mongoose, { Schema, type InferSchemaType } from "mongoose";

const faqItemSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["health", "adoption", "import", "visiting", "delivery"],
      default: "adoption",
      index: true,
    },
    featuredOnHome: { type: Boolean, default: false, index: true },
    displayOrder: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export type FaqItemDocument = InferSchemaType<typeof faqItemSchema>;
export const FaqItem = mongoose.model("FaqItem", faqItemSchema);

