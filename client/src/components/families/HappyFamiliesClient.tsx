import { PolaroidCard } from "./PolaroidCard";
import type { HappyFamily } from "@/lib/types";

/** Photo ratios cycled through the wall so it reads as a natural scattered collage. */
const RATIOS = ["4 / 5", "3 / 4", "1 / 1", "4 / 5", "3 / 4", "5 / 6"];

/** All 25 local .webp photos from /public/images/families/ */
export const ALL_FAMILY_WEBP_PHOTOS: Array<{
  _id: string;
  imageUrl: string;
  caption: string;
  clientName: string;
  location: string;
  tiltDeg: number;
  tapeColor: string;
  testimonialQuote?: string;
}> = [
    {
      _id: "fam-01",
      imageUrl: "/images/families/27b888_4af83a5cffb44045bcab615b0cbc237c-mv2.webp",
      caption: "First cuddle in Dubai ♥",
      clientName: "Sarah M.",
      location: "Dubai, UAE",
      tiltDeg: -2.2,
      tapeColor: "rgba(246, 215, 154, 0.85)",
      testimonialQuote:
        "TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.",
    },
    {
      _id: "fam-02",
      imageUrl: "/images/families/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.webp",
      caption: "Milo's first morning home",
      clientName: "Omar & Layla",
      location: "Abu Dhabi, UAE",
      tiltDeg: 1.8,
      tapeColor: "rgba(242, 206, 162, 0.85)",
    },
    {
      _id: "fam-03",
      imageUrl: "/images/families/27b888_082e47dfd8144423a96dc70d966fa5b2-mv2.webp",
      caption: "Park day in Abu Dhabi",
      clientName: "Nadia K.",
      location: "Abu Dhabi, UAE",
      tiltDeg: -1.4,
      tapeColor: "rgba(246, 215, 154, 0.85)",
    },
    {
      _id: "fam-04",
      imageUrl: "/images/families/27b888_89af9713331443c3b9f4b72a83d646e3-mv2.webp",
      caption: "Best decision we ever made",
      clientName: "Elena R.",
      location: "Dubai Marina, UAE",
      tiltDeg: 2.4,
      tapeColor: "rgba(238, 198, 158, 0.85)",
    },
    {
      _id: "fam-05",
      imageUrl: "/images/families/27b888_96b9eb6428164f41b124137673bc865c-mv2.webp",
      caption: "Welcome home, Coco!",
      clientName: "Tariq A.",
      location: "Downtown Dubai, UAE",
      tiltDeg: -1.9,
      tapeColor: "rgba(246, 215, 154, 0.85)",
    },
    {
      _id: "fam-06",
      imageUrl: "/images/families/27b888_522e394293a845bcae93adec46bf499c-mv2.webp",
      caption: "Our little teddy bear ♥",
      clientName: "Maya & Sam",
      location: "Palm Jumeirah, UAE",
      tiltDeg: 1.5,
      tapeColor: "rgba(244, 210, 160, 0.85)",
    },
    {
      _id: "fam-07",
      imageUrl: "/images/families/27b888_927dffc200a44f9dafcb953b765beec0-mv2.webp",
      caption: "Sunday naps together",
      clientName: "Huda S.",
      location: "Sharjah, UAE",
      tiltDeg: -2.1,
      tapeColor: "rgba(246, 215, 154, 0.85)",
    },
    {
      _id: "fam-08",
      imageUrl: "/images/families/27b888_3594e056bf964a7a839a1bd5ac0c859e-mv2.webp",
      caption: "Pure puppy joy!",
      clientName: "Daniel & Chloe",
      location: "Dubai Hills, UAE",
      tiltDeg: 1.9,
      tapeColor: "rgba(240, 204, 154, 0.85)",
    },
    {
      _id: "fam-09",
      imageUrl: "/images/families/27b888_15920f828b864dd1b44b98ec4e964c53-mv2.webp",
      caption: "Love at first sight",
      clientName: "Yasmine F.",
      location: "Jumeirah, UAE",
      tiltDeg: -1.6,
      tapeColor: "rgba(246, 215, 154, 0.85)",
    },
    {
      _id: "fam-10",
      imageUrl: "/images/families/27b888_ade4298d721a444888379393d06745cb-mv2.webp",
      caption: "Biscuit's new forever home",
      clientName: "Kareem M.",
      location: "Saadiyat Island, UAE",
      tiltDeg: 2.1,
      tapeColor: "rgba(242, 206, 162, 0.85)",
    },
    {
      _id: "fam-11",
      imageUrl: "/images/families/27b888_bba195dd5eec46e798d3dc05790f1e99-mv2.webp",
      caption: "Tiny paws, big heart ♥",
      clientName: "Lina & Mark",
      location: "Dubai Creek, UAE",
      tiltDeg: -2.3,
      tapeColor: "rgba(246, 215, 154, 0.85)",
    },
    {
      _id: "fam-12",
      imageUrl: "/images/families/27b888_cfe895dbcc2d4bff85f890be9b496543-mv2.webp",
      caption: "Afternoon walks in the sun",
      clientName: "Rami H.",
      location: "Arabian Ranches, UAE",
      tiltDeg: 1.4,
      tapeColor: "rgba(238, 198, 158, 0.85)",
    },
    {
      _id: "fam-13",
      imageUrl: "/images/families/27b888_d8c90ec444654b9c964dc2527814ceaf-mv2.webp",
      caption: "Sweetest addition to the family",
      clientName: "Amira Z.",
      location: "Dubai, UAE",
      tiltDeg: -1.7,
      tapeColor: "rgba(246, 215, 154, 0.85)",
    },
    {
      _id: "fam-14",
      imageUrl: "/images/families/27b888_dad1db0c47834985a25b98b067cf563e-mv2.webp",
      caption: "Wait till you see this smile!",
      clientName: "Sophie B.",
      location: "DIFC, Dubai",
      tiltDeg: 2.2,
      tapeColor: "rgba(244, 210, 160, 0.85)",
    },
    {
      _id: "fam-15",
      imageUrl: "/images/families/27b888_f7f4966e59e94db591784d4ec546682f-mv2.webp",
      caption: "Cozy evenings with Teddy",
      clientName: "Faisal & Nour",
      location: "Abu Dhabi, UAE",
      tiltDeg: -1.3,
      tapeColor: "rgba(246, 215, 154, 0.85)",
    },
    {
      _id: "fam-16",
      imageUrl: "/images/families/27b888_ff288b45f9694416b3f3d019d7a9a1d4-mv2.webp",
      caption: "Fluffiest bundle of happiness",
      clientName: "Claire W.",
      location: "JLT, Dubai",
      tiltDeg: 1.7,
      tapeColor: "rgba(240, 204, 154, 0.85)",
    },
    {
      _id: "fam-17",
      imageUrl: "/images/families/b942a5_03ab53e8167c454eaf75e37491e51b03-mv2.webp",
      caption: "Home sweet home ♥",
      clientName: "Zayd A.",
      location: "Al Barari, Dubai",
      tiltDeg: -2.0,
      tapeColor: "rgba(246, 215, 154, 0.85)",
    },
    {
      _id: "fam-18",
      imageUrl: "/images/families/b942a5_65113182432144f49bd50bb009e7d88c-mv2.webp",
      caption: "Our hearts are so full",
      clientName: "Hannah & Leo",
      location: "City Walk, Dubai",
      tiltDeg: 1.6,
      tapeColor: "rgba(242, 206, 162, 0.85)",
    },
    {
      _id: "fam-19",
      imageUrl: "/images/families/edb2f5_02b95a69a2c24c7e81b60e6d8c01baf7-mv2.webp",
      caption: "Meet little Peanut!",
      clientName: "Reem K.",
      location: "Yas Island, Abu Dhabi",
      tiltDeg: -1.5,
      tapeColor: "rgba(246, 215, 154, 0.85)",
    },
    {
      _id: "fam-20",
      imageUrl: "/images/families/edb2f5_7ed2ee1ba89b4230b52f5e3981b1b198-mv2.webp",
      caption: "Inseparable from day one",
      clientName: "Lucas M.",
      location: "Business Bay, Dubai",
      tiltDeg: 2.3,
      tapeColor: "rgba(238, 198, 158, 0.85)",
    },
    {
      _id: "fam-21",
      imageUrl: "/images/families/edb2f5_37f5218f73e842b88ee3ae0c911bcafa-mv2.webp",
      caption: "Weekend adventures begin",
      clientName: "Dalia & Adam",
      location: "Mirdif, Dubai",
      tiltDeg: -1.8,
      tapeColor: "rgba(246, 215, 154, 0.85)",
    },
    {
      _id: "fam-22",
      imageUrl: "/images/families/edb2f5_258010c661f64f3b8b952c5a2f7677de-mv2.webp",
      caption: "So gentle and playful ♥",
      clientName: "Natalia V.",
      location: "Palm Jumeirah, UAE",
      tiltDeg: 1.3,
      tapeColor: "rgba(244, 210, 160, 0.85)",
    },
    {
      _id: "fam-23",
      imageUrl: "/images/families/edb2f5_6627857aca7e495ea37d9f62d814d323-mv2.webp",
      caption: "Waking up to this face!",
      clientName: "Sami & Farah",
      location: "Emirates Hills, Dubai",
      tiltDeg: -2.4,
      tapeColor: "rgba(246, 215, 154, 0.85)",
    },
    {
      _id: "fam-24",
      imageUrl: "/images/families/edb2f5_adf88f7400c848249d60698fca0336e9-mv2.webp",
      caption: "Forever grateful to TeddyPups",
      clientName: "Victoria L.",
      location: "Dubai Marina, UAE",
      tiltDeg: 1.9,
      tapeColor: "rgba(240, 204, 154, 0.85)",
    },

  ];

/**
 * Merges incoming API family records with all 25 local .webp photos
 * so every single photo in /public/images/families/ is displayed.
 */
export function buildAllHappyFamilies(apiFamilies: HappyFamily[] = []): HappyFamily[] {
  return ALL_FAMILY_WEBP_PHOTOS.map((localPhoto, index) => {
    const existing = apiFamilies[index];
    const hasValidWebp =
      existing?.imageUrl && existing.imageUrl.toLowerCase().endsWith(".webp");

    return {
      ...(existing ?? {}),
      _id: existing?._id || localPhoto._id,
      imageUrl: hasValidWebp ? existing.imageUrl : localPhoto.imageUrl,
      caption: existing?.caption || localPhoto.caption,
      clientName: existing?.clientName || localPhoto.clientName,
      location: existing?.location || localPhoto.location,
      tiltDeg: existing?.tiltDeg ?? localPhoto.tiltDeg,
      tapeColor: existing?.tapeColor || localPhoto.tapeColor,
      testimonialQuote: existing?.testimonialQuote || localPhoto.testimonialQuote,
    } as HappyFamily;
  });
}

export function HappyFamiliesClient({ families }: { families: HappyFamily[] }) {
  const allFamilies =
    families.length >= ALL_FAMILY_WEBP_PHOTOS.length &&
      families.every((f) => f.imageUrl?.endsWith(".webp"))
      ? families
      : buildAllHappyFamilies(families);

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 lg:gap-8">
      {allFamilies.map((family, i) => (
        <div key={family._id} className="break-inside-avoid mb-5 sm:mb-8 px-1 pt-3">
          <PolaroidCard family={family} ratio={RATIOS[i % RATIOS.length]} />
        </div>
      ))}
    </div>
  );
}