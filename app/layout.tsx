import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { Navbar, Toast } from "@/components/SiteChrome";
import { Footer } from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VANTA ARC — SOUND, SHAPED BY DESIGN.",
  description:
    "VANTA ARC is a fictional concept brand for premium wireless headphones with spatial audio. Browse, customize in 3D, and try a demo checkout — no real payment is taken.",
  openGraph: {
    title: "VANTA ARC — SOUND, SHAPED BY DESIGN.",
    description: "Premium wireless headphones, spatial audio, and accessories. Fictional concept storefront with a demo checkout.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0a0a0b] text-zinc-50">
        <StoreProvider>
          <Navbar />
          <main className="pt-[57px]">{children}</main>
          <Footer />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
