"use client";

import { CalPopupButton } from "@/components/cal-popup-button";
import { Sawarabi_Gothic } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const sawarabiGothic = Sawarabi_Gothic({
  weight: "400",
  subsets: ["latin"],
});

type ItemHovered = (typeof NAV_ITEMS)[number]["key"];

export default function Header() {
  const [itemHovered, setItemHovered] = useState<ItemHovered | null>(null);

  return (
    <>
      {/* Desktop / tablet header */}
      <header className="m-5 mx-auto hidden max-w-2xl items-center justify-between rounded-full p-1.5 shadow-[0_0_3px_0.25px_rgba(0,0,0,0.2)] md:flex">
        <Image src="/logo.svg" alt="logo" width={37} height={36} />

        <nav className="flex gap-7" onMouseLeave={() => setItemHovered(null)}>
          {NAV_ITEMS.slice(0, 2).map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onMouseEnter={() => setItemHovered(item.key)}
              className={[
                "transition-colors duration-300",
                !itemHovered
                  ? "text-neutral-600"
                  : itemHovered === item.key
                    ? "text-neutral-950"
                    : "text-neutral-950/40",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <h1
          className={`${sawarabiGothic.className} pb-1 text-2xl tracking-[-0.02em]`}
        >
          Hanabi
        </h1>

        <nav className="flex gap-7" onMouseLeave={() => setItemHovered(null)}>
          {NAV_ITEMS.slice(2).map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onMouseEnter={() => setItemHovered(item.key)}
              className={[
                "transition-colors duration-300",
                !itemHovered
                  ? "text-neutral-600"
                  : itemHovered === item.key
                    ? "text-neutral-950"
                    : "text-neutral-950/40",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <CalPopupButton className="text-background font-inter inline-flex cursor-pointer items-center rounded-full border border-neutral-900 bg-linear-to-b from-neutral-900 to-black p-1 px-4 font-medium inset-shadow-sm inset-shadow-neutral-500 text-shadow-neutral-500 text-shadow-xs active:scale-95">
          Book a Call
        </CalPopupButton>
      </header>

      {/* Mobile header */}
      <header className="mx-auto w-full md:hidden">
        <div className="mx-4 mt-4 rounded-2xl border border-black/10 bg-white/90 px-3 py-2 shadow-[0_0_3px_0.25px_rgba(0,0,0,0.16)] backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="logo" width={30} height={30} />
              <div className={`${sawarabiGothic.className} text-xl`}>
                Hanabi
              </div>
            </div>

            <CalPopupButton className="text-background font-inter inline-flex items-center justify-center rounded-xl border border-neutral-900 bg-linear-to-b from-neutral-900 to-black px-3 py-2 text-sm font-medium inset-shadow-sm inset-shadow-neutral-500 text-shadow-neutral-500 text-shadow-xs active:scale-95">
              Book a Call
            </CalPopupButton>
          </div>
        </div>
      </header>
    </>
  );
}

const NAV_ITEMS = [
  {
    key: "services",
    label: "Services",
    href: "/#services",
  },
  {
    key: "works",
    label: "Our works",
    href: "/#works",
  },
  {
    key: "why-us",
    label: "Why us",
    href: "/#why-us",
  },
  {
    key: "about-us",
    label: "About us",
    href: "/#about-us",
  },
] as const;
