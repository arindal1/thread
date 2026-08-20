import type { Metadata } from "next";
import { fontVariablesClassName, fontFallbackStyles } from "./fonts";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thread.app";
const SITE_NAME = "Thread";
const DESCRIPTION =
  "Thread is a private memory system for people - store facts, notes, and context about everyone you know, and never forget what matters before your next conversation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Thread | A Personal CRM",
    template: "%s · Thread",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "personal CRM",
    "relationship management",
    "contact notes",
    "private memory system",
    "networking tool",
    "thread",
    "thread app",
    "github",
    "arindal",
    "Arindal Char"
  ],
  authors: [{ name: "Thread" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Thread - A Personal CRM",
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thread - A Personal CRM",
    description: DESCRIPTION,
    images: ["/twitter-image"],
  },
};

export const viewport = {
  themeColor: "#0b0908",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariablesClassName}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: fontFallbackStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}