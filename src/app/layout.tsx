// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "@/lib/utils/transition-context";
import PageTransitionOverlay from "@/components/layout/PageTransitionOverlay";
import AdminKeyListener from "@/components/admin/AdminKeyListener";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Virendra Purohit",
  description:
    "Full Stack Developer, Backend Engineer & Cybersecurity Analyst. Building scalable web applications and secure systems.",
  openGraph: {
    title: "Virendra Purohit",
    description:
      "Full Stack Developer, Backend Engineer & Cybersecurity Analyst.",
    url: "https://virendrapurohit.vercel.app",
    siteName: "Virendra Purohit",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Virendra Purohit — Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virendra Purohit",
    description:
      "Full Stack Developer, Backend Engineer & Cybersecurity Analyst.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorantGaramond.variable}`}
    >
      <body>
        <TransitionProvider>
          <AdminKeyListener />
          {children}
          <PageTransitionOverlay />
          <Toaster />
        </TransitionProvider>
      </body>
    </html>
  );
}
