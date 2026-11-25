const DEFAULT_WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971500000000";

export function buildWhatsAppUrl(
  message = "Hi TeddyPups! I'd love to know more about your available puppies."
): string {
  const digits = DEFAULT_WHATSAPP.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const SITE_CONTACT = {
  whatsappDisplay: "+971 50 000 0000",
  email: process.env.NEXT_PUBLIC_SITE_EMAIL ?? "info@instabizweb.com",
  location:
    process.env.NEXT_PUBLIC_SHOWROOM_LOCATION ??
    "Downtown Dubai, United Arab Emirates",
};

