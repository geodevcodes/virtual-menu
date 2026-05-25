import TanstackProvider from "@/providers/TanstackProvider";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_NAME = "Virtual Menu";
const APP_DEFAULT_TITLE = "Virtual Menu";
const APP_TITLE_TEMPLATE = "%s | Virtual Menu";
const APP_DESCRIPTION =
  "Virtual Menu is a smart digital menu management platform built for restaurants, hotels, lounges, spas, and hospitality businesses.";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;
const imageUrl = `${APP_URL}/opengraph-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),

  applicationName: APP_NAME,

  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },

  description: APP_DESCRIPTION,
  keywords: [
    // Core Product
    "virtual menu",
    "digital menu",
    "smart menu platform",
    "online menu system",
    "restaurant digital menu",
    "QR code menu",
    "scan menu",
    "contactless menu",
    "mobile restaurant menu",
    "interactive restaurant menu",

    // Hospitality
    "restaurant management",
    "hotel menu management",
    "hospitality management platform",
    "restaurant technology",
    "hospitality software",
    "restaurant SaaS",
    "hotel digital services",
    "lounge menu system",
    "spa menu platform",

    // Menu Types
    "food menu",
    "drink menu",
    "cocktail menu",
    "spa services menu",
    "accommodation menu",
    "hotel room service menu",
    "restaurant food catalog",

    // Features
    "menu QR generator",
    "QR menu platform",
    "digital food ordering",
    "menu sharing platform",
    "cloud menu management",
    "multi-device menu access",
    "paperless restaurant menu",
    "restaurant customer experience",
    "easy menu management",

    // Business Types
    "restaurants",
    "hotels",
    "lounges",
    "cafes",
    "bars",
    "resorts",
    "hospitality businesses",
    "hospitality software",
    "hotel menu management",

    // Tech / Branding
    "Virtual Menu app",
    "Virtual Menu platform",
    "Next.js application",
    "NestJS backend",
    "modern restaurant software",
  ],

  creator: "geodevcodes",
  publisher: "Virtual Menu",
  category: "technology",
  manifest: "/manifest.json",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  themeColor: "#5C2E1B",

  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },

  alternates: {
    canonical: `${APP_URL}`,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Virtual Menu Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    site: "@geodevcodes",
    creator: "@geodevcodes",
    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>{children}</TanstackProvider>
        <Toaster position="top-center" richColors={true} />
      </body>
    </html>
  );
}
