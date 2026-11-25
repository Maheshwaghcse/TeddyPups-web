import { FALLBACK_FAMILIES, FALLBACK_FAQS, FALLBACK_PUPPIES } from "./fallbackData";
import type {
  BreedSummary,
  FaqItem,
  HappyFamily,
  InquiryPayload,
  InquiryRecord,
  Puppy,
} from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000/api";

interface ApiListResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  message?: string;
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.message ?? `Request failed (${res.status})`);
  }
  return json;
}

export async function fetchPuppies(filters?: {
  origin?: string;
  status?: string;
  breed?: string;
  gender?: string;
  featured?: boolean;
  search?: string;
}): Promise<Puppy[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.origin && filters.origin !== "all") params.set("origin", filters.origin);
    if (filters?.status && filters.status !== "all") params.set("status", filters.status);
    if (filters?.breed && filters.breed !== "all") params.set("breed", filters.breed);
    if (filters?.gender && filters.gender !== "all") params.set("gender", filters.gender);
    if (filters?.featured) params.set("featured", "true");
    if (filters?.search?.trim()) params.set("search", filters.search.trim());

    const qs = params.toString();
    const res = await fetchJson<ApiListResponse<Puppy[]>>(`/puppies${qs ? `?${qs}` : ""}`);
    return res.data;
  } catch {
    return FALLBACK_PUPPIES.filter((p) => {
      if (filters?.origin && filters.origin !== "all" && p.origin !== filters.origin) return false;
      if (filters?.status && filters.status !== "all" && p.status !== filters.status) return false;
      if (
        filters?.breed &&
        filters.breed !== "all" &&
        p.breed.toLowerCase() !== filters.breed.toLowerCase()
      ) {
        return false;
      }
      if (filters?.featured && !p.featuredOnHome) return false;
      return true;
    });
  }
}

export async function fetchBreeds(): Promise<BreedSummary[]> {
  try {
    const res = await fetchJson<ApiListResponse<BreedSummary[]>>("/puppies/breeds");
    return res.data;
  } catch {
    return [
      { breed: "Maltipoo", total: 3, availableCount: 3 },
      { breed: "Pomeranian", total: 2, availableCount: 2 },
      { breed: "Toy Poodle", total: 1, availableCount: 1 },
      { breed: "Cavapoo", total: 1, availableCount: 1 },
      { breed: "Shih Tzu", total: 2, availableCount: 2 },
    ];
  }
}

export async function fetchPuppyBySlug(
  slug: string
): Promise<{ puppy: Puppy; related: Puppy[] } | null> {
  try {
    const res = await fetchJson<ApiListResponse<{ puppy: Puppy; related: Puppy[] }>>(
      `/puppies/${encodeURIComponent(slug)}`
    );
    return res.data;
  } catch {
    const found = FALLBACK_PUPPIES.find((p) => p.slug === slug);
    if (!found) return null;
    return {
      puppy: found,
      related: FALLBACK_PUPPIES.filter((p) => p.slug !== slug).slice(0, 3),
    };
  }
}

export async function fetchHappyFamilies(filters?: {
  featured?: boolean;
  breed?: string;
}): Promise<HappyFamily[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.featured) params.set("featured", "true");
    if (filters?.breed && filters.breed !== "all") params.set("breed", filters.breed);
    const qs = params.toString();
    const res = await fetchJson<ApiListResponse<HappyFamily[]>>(
      `/happy-families${qs ? `?${qs}` : ""}`
    );
    return res.data;
  } catch {
    return FALLBACK_FAMILIES;
  }
}

export async function fetchFaqs(filters?: {
  featured?: boolean;
  category?: string;
  search?: string;
}): Promise<FaqItem[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.featured) params.set("featured", "true");
    if (filters?.category && filters.category !== "all") params.set("category", filters.category);
    if (filters?.search?.trim()) params.set("search", filters.search.trim());
    const qs = params.toString();
    const res = await fetchJson<ApiListResponse<FaqItem[]>>(`/faqs${qs ? `?${qs}` : ""}`);
    return res.data;
  } catch {
    return FALLBACK_FAQS;
  }
}

export async function submitInquiry(
  payload: InquiryPayload
): Promise<{ message: string; data: InquiryRecord }> {
  return fetchJson<{ success: boolean; message: string; data: InquiryRecord }>("/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function adminFetchInquiries(adminSecret: string): Promise<InquiryRecord[]> {
  const res = await fetchJson<ApiListResponse<InquiryRecord[]>>("/inquiries", {
    headers: { "x-admin-secret": adminSecret },
  });
  return res.data;
}

export async function adminUpdateInquiryStatus(
  id: string,
  status: "new" | "contacted" | "closed",
  adminSecret: string
): Promise<InquiryRecord> {
  const res = await fetchJson<ApiListResponse<InquiryRecord>>(`/inquiries/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-secret": adminSecret,
    },
    body: JSON.stringify({ status }),
  });
  return res.data;
}

export async function adminCreatePuppy(
  payload: Omit<Puppy, "_id">,
  adminSecret: string
): Promise<Puppy> {
  const res = await fetchJson<ApiListResponse<Puppy>>("/puppies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-secret": adminSecret,
    },
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function adminUpdatePuppyStatus(
  id: string,
  status: Puppy["status"],
  adminSecret: string
): Promise<Puppy> {
  const res = await fetchJson<ApiListResponse<Puppy>>(`/puppies/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-secret": adminSecret,
    },
    body: JSON.stringify({ status }),
  });
  return res.data;
}

