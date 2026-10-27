import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CustomCursor, Footer, Loader, Navbar } from "@/components/Chrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUMEN STUDIO — Immersive 3D & Motion",
  description:
    "Premium cinematic 3D website: interactive Three.js scenes, GSAP motion aur Google Flow cinematic videos. Brand naam aur text lib/site-content.ts se badla ja sakta hai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#050507] text-zinc-50">
        <Loader />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
