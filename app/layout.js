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

export const metadata = {
  metadataBase: new URL("https://kyrox-eight.vercel.app"),

  title: {
    default: "KyroX",
    template: "%s | KyroX",
  },

  description:
    "KyroX is a modern Discord bot for server management, moderation, tickets, automation, premium features and more.",

  applicationName: "KyroX",

  keywords: [
    "KyroX",
    "Discord Bot",
    "Discord Server",
    "Discord Moderation",
    "Discord Tickets",
    "Discord Dashboard",
    "Discord Automation",
    "Server Management",
  ],

  authors: [
    {
      name: "KyroX",
    },
  ],

  creator: "KyroX",
  publisher: "KyroX",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KyroX",
    title: "KyroX",
    description:
      "Manage your Discord server with KyroX — moderation, tickets, automation, premium features and more.",
    url: "https://kyrox-eight.vercel.app",
  },

  twitter: {
    card: "summary_large_image",
    title: "KyroX",
    description:
      "Manage your Discord server with KyroX — moderation, tickets, automation, premium features and more.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="
          min-h-screen
          flex
          flex-col
          bg-[#0a0b0e]
          text-white
          font-sans
          selection:bg-violet-500/30
          selection:text-white
        "
      >
        {children}
      </body>
    </html>
  );
}