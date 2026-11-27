import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorPawTrail } from "@/components/layout/CursorPawTrail";
import { PageTransitionCurtain } from "@/components/layout/PageTransitionCurtain";

export const metadata: Metadata = {
  title: "TeddyPups U.A.E. — Premium Teacup Puppies in Dubai",
  description:
    "Meet your new best friend in our Downtown Dubai showroom, or import a healthy Korean teacup Maltipoo, Toy Poodle, Cavapoo, Pomeranian, or Shih Tzu worldwide.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#f2be6b] selection:text-[#2a170e]">
        <CursorPawTrail />
        <PageTransitionCurtain />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
