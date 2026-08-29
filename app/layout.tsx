import { Analytics } from "@vercel/analytics/next";
import { Agentation } from "agentation";
import type { Metadata } from "next";
import { Geist_Mono, Inter, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
const siteDescription =
  "Hanabi is a product design and web development studio that creates fast, elegant, and intuitive digital experiences for ambitious founders and forward-thinking enterprises.";
const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Hanabi product design and web development studio",
  type: "image/png",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Hanabi",
  title: {
    default: "Hanabi",
    template: "%s | Hanabi",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Hanabi",
    title: "Hanabi",
    description: siteDescription,
    images: [ogImage],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanabi",
    description: siteDescription,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body
        className={`${inter.variable} ${geistMono.variable} font-inter overflow-x-clip tracking-[-0.04em] antialiased`}
      >
        <Script
          defer
          src="https://umami.cooldash.xyz/script.js"
          data-website-id="3d9dc9b1-5b75-4eaf-97e6-c714b1058b70"
          strategy="afterInteractive"
        />
        <Analytics />
        {children}
        {process.env.NODE_ENV === "development" ? <Agentation /> : null}
      </body>
    </html>
  );
}
