import { z } from "zod";

export const createInquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(160),
  whatsappNumber: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone or WhatsApp number")
    .max(30),
  inquiryType: z
    .enum(["showroom-visit", "puppy-enquiry", "import-request", "general"])
    .default("puppy-enquiry"),
  puppyId: z.string().trim().optional().nullable(),
  puppySlug: z.string().trim().max(120).optional().default(""),
  preferredBreed: z.string().trim().max(80).optional().default(""),
  preferredDate: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().min(5, "Please write a short message").max(2000),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(["new", "contacted", "closed"]),
});

export const createPuppySchema = z.object({
  name: z.string().trim().max(80).optional().default(""),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, "Slug must contain lowercase letters, numbers, and hyphens"),
  title: z.string().trim().min(2).max(120),
  breed: z.string().trim().min(2).max(80),
  gender: z.enum(["boy", "girl", "boy & girl"]),
  ageMonths: z.number().int().min(1).max(24),
  ageLabel: z.string().trim().min(2).max(40),
  origin: z.enum(["dubai", "korea"]),
  status: z.enum(["available", "reserved", "gone-home"]).default("available"),
  hasVideo: z.boolean().default(false),
  doorColor: z.string().trim().default("#C97538"),
  defaultDoorOpen: z.boolean().default(false),
  priceAed: z.number().nonnegative(),
  color: z.string().trim().min(2).max(80),
  expectedAdultWeight: z.string().trim().min(2).max(60),
  images: z.array(z.string().trim().min(1)).min(1),
  videoUrl: z.string().trim().optional().default(""),
  description: z.string().trim().min(10).max(2000),
  personalityTags: z.array(z.string().trim()).optional().default([]),
  healthChecks: z
    .object({
      vaccinated: z.boolean().default(true),
      dewormed: z.boolean().default(true),
      vetCertificate: z.boolean().default(true),
      microchipped: z.boolean().default(true),
    })
    .optional(),
  featuredOnHome: z.boolean().default(false),
  displayOrder: z.number().int().default(100),
});

export const updatePuppySchema = createPuppySchema.partial();

export const createHappyFamilySchema = z.object({
  caption: z.string().trim().min(2).max(140),
  imageUrl: z.string().trim().min(1),
  tapeColor: z.string().trim().optional().default("rgba(244, 224, 185, 0.85)"),
  tiltDeg: z.number().min(-15).max(15).optional().default(-2),
  puppyBreed: z.string().trim().min(2).max(80),
  location: z.string().trim().max(100).optional().default("Dubai, UAE"),
  testimonialQuote: z.string().trim().max(1000).optional().default(""),
  clientName: z.string().trim().max(80).optional().default(""),
  featuredOnHome: z.boolean().default(false),
  displayOrder: z.number().int().default(100),
});

export const createFaqSchema = z.object({
  question: z.string().trim().min(5).max(240),
  answer: z.string().trim().min(5).max(2000),
  category: z.enum(["health", "adoption", "import", "visiting", "delivery"]).default("adoption"),
  featuredOnHome: z.boolean().default(false),
  displayOrder: z.number().int().default(100),
});

