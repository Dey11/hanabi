import { Analytics } from "@vercel/analytics/next";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import type { Metadata } from "next";
import { Geist_Mono, Inter, Geist } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  title: "Hanabi",
  description:
    "Ignite your brand with stunning design and seamless web experiences — Hanabi, your creative digital partner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className={`${inter.variable} ${geistMono.variable} font-inter overflow-x-clip tracking-[-0.04em] antialiased`}
      >
        <Analytics />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
