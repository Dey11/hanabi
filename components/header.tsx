"use client";

import Image from "next/image";
import Link from "next/link";
import { Sawarabi_Gothic } from "next/font/google";
import { useState } from "react";

const sawarabiGothic = Sawarabi_Gothic({
  weight: "400",
  subsets: ["latin"],
});

type ItemHovered =
  | "services"
  | "our-works"
  | "why-us"
  | "about-us"
  | "pricing"
  | "faq";

export default function Header() {
  const [itemHovered, setItemHovered] = useState<ItemHovered | null>(null);

  return (
    <header className="m-5 mx-auto flex max-w-4xl items-center justify-between rounded-full p-1.5 shadow-[0_0_5px_0_rgba(0,0,0,0.2)]">
      <Image src="/logo.svg" alt="logo" width={37} height={36} />

      <nav className="flex gap-7 text-[#6C6C6C]">
        {navItems1.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onMouseEnter={() => setItemHovered(item.label as ItemHovered)}
            onMouseLeave={() => setItemHovered(null)}
            className={`transition-colors duration-300 ${itemHovered === item.label ? "text-foreground" : !itemHovered ? "text-[#6C6C6C]" : "text-[#6C6C6C]/70"}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <h1
        className={`${sawarabiGothic.className} pb-1 text-2xl -tracking-[0.02em]`}
      >
        Hanabi
      </h1>

      <nav className="flex gap-7 text-[#6C6C6C]">
        {navItems2.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onMouseEnter={() => setItemHovered(item.label as ItemHovered)}
            onMouseLeave={() => setItemHovered(null)}
            className={`transition-colors duration-300 ${itemHovered === item.label ? "text-foreground" : !itemHovered ? "text-[#6C6C6C]" : "text-[#6C6C6C]/70"}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button className="bg-foreground text-background font-inter cursor-pointer rounded-full p-1 px-4 font-medium">
        See Pricing
      </button>
    </header>
  );
}

const navItems1 = [
  {
    id: 1,
    label: "Services",
    href: "/#services",
  },
  {
    id: 2,
    label: "Our works",
    href: "/#our-works",
  },
  {
    id: 3,
    label: "Why us",
    href: "/#why-us",
  },
];

const navItems2 = [
  {
    id: 4,
    label: "About us",
    href: "/#about-us",
  },
  {
    id: 5,
    label: "Pricing",
    href: "/#pricing",
  },
  {
    id: 6,
    label: "FAQ",
    href: "/#faq",
  },
];
