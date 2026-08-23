import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://kyrox-eight.vercel.app";

const title = "Policies, Terms & Privacy | KyroX";

const description =
  "Read the official KyroX policies, terms of use and privacy information. Learn about moderation, data processing, Premium, Server Credits, events, user responsibilities, prohibited use and all Discord bot features.";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: title,
    template: "%s | KyroX",
  },

  description,
  applicationName: "KyroX",
  category: "legal",
  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: "/",
  },

  keywords: [
    "KyroX",
    "KyroX Policies",
    "KyroX Terms of Use",
    "KyroX Privacy",
    "Discord Bot Policies",
    "Discord Bot Privacy",
    "KyroX Premium",
    "KyroX Server Credits",
  ],

  authors: [
    {
      name: "KyroX",
      url: siteUrl,
    },
  ],

  creator: "KyroX",
  publisher: "KyroX",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "/",
    locale: "en_US",
    alternateLocale: ["de_DE"],
    siteName: "KyroX",
    title,
    description,
  },

  twitter: {
    card: "summary",
    title,
    description,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#070a10",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-[#070A10] text-[#F1F5F9] font-sans antialiased selection:bg-emerald-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}