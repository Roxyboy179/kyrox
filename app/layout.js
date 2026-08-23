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
const title = "Richtlinien & Rechtliches | KyroX";
const description =
  "Offizielle KyroX-Richtlinien zu Nutzung, Datenschutz, Moderation, Premium, Server Credits, Events und weiteren Bot-Funktionen.";

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
    "KyroX Richtlinien",
    "KyroX Nutzungsbedingungen",
    "KyroX Datenschutz",
    "Discord Bot Richtlinien",
    "Discord Bot Datenschutz",
    "KyroX Premium",
    "KyroX Server Credits",
  ],

  authors: [{ name: "KyroX", url: siteUrl }],
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
    locale: "de_DE",
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
