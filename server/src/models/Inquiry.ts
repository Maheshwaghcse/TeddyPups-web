import mongoose, { Schema, type InferSchemaType } from "mongoose";

const inquirySchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    whatsappNumber: { type: String, required: true, trim: true },
    inquiryType: {
      type: String,
      enum: ["showroom-visit", "puppy-enquiry", "import-request", "general"],
      default: "puppy-enquiry",
    },
    puppyId: { type: Schema.Types.ObjectId, ref: "Puppy", default: null },
    puppySlug: { type: String, default: "", trim: true },
    preferredBreed: { type: String, default: "", trim: true },
    preferredDate: { type: String, default: "", trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

export type InquiryDocument = InferSchemaType<typeof inquirySchema>;
export const Inquiry = mongoose.model("Inquiry", inquirySchema);

