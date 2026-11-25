export interface HealthChecks {
  vaccinated: boolean;
  dewormed: boolean;
  vetCertificate: boolean;
  microchipped: boolean;
}

export interface Puppy {
  _id: string;
  name?: string;
  slug: string;
  title: string;
  breed: string;
  gender: "boy" | "girl" | "boy & girl";
  ageMonths: number;
  ageLabel: string;
  origin: "dubai" | "korea";
  status: "available" | "reserved" | "gone-home";
  hasVideo: boolean;
  doorColor: string;
  defaultDoorOpen?: boolean;
  priceAed: number;
  color: string;
  expectedAdultWeight: string;
  images: string[];
  videoUrl?: string;
  description: string;
  personalityTags: string[];
  healthChecks: HealthChecks;
  featuredOnHome: boolean;
  displayOrder: number;
}

export interface HappyFamily {
  _id: string;
  caption: string;
  imageUrl: string;
  tapeColor: string;
  tiltDeg: number;
  puppyBreed: string;
  location: string;
  testimonialQuote?: string;
  clientName?: string;
  featuredOnHome: boolean;
  displayOrder: number;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category: "health" | "adoption" | "import" | "visiting" | "delivery";
  featuredOnHome: boolean;
  displayOrder: number;
}

export interface InquiryPayload {
  fullName: string;
  email: string;
  whatsappNumber: string;
  inquiryType: "showroom-visit" | "puppy-enquiry" | "import-request" | "general";
  puppyId?: string | null;
  puppySlug?: string;
  preferredBreed?: string;
  preferredDate?: string;
  message: string;
}

export interface InquiryRecord extends InquiryPayload {
  _id: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export interface BreedSummary {
  breed: string;
  total: number;
  availableCount: number;
}

