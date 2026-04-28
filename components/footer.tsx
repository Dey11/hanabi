"use client";

import { Sawarabi_Gothic } from "next/font/google";
import Image from "next/image";
import { useMemo } from "react";

const sawarabiGothic = Sawarabi_Gothic({
  weight: "400",
  subsets: ["latin"],
});

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStringToSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const DOT_COLORS = [
  "bg-[#FF2500]",
  "bg-[#FF9900]",
  "bg-emerald-400",
  "bg-sky-400",
  "bg-cyan-400",
  "bg-fuchsia-400",
  "bg-violet-400",
  "bg-rose-400",
  "bg-amber-300",
  "bg-lime-300",
  "bg-white/70",
] as const;

function DotField({
  seedKey,
  cols,
  className,
}: {
  seedKey: string;
  cols: number;
  className?: string;
}) {
  const dots = useMemo(() => {
    const rand = mulberry32(hashStringToSeed(seedKey));
    const total = 4 * cols;
    return Array.from({ length: total }, () => {
      const idx = Math.floor(rand() * DOT_COLORS.length);
      const opacity = 0.55 + rand() * 0.45;
      return { color: DOT_COLORS[idx], opacity };
    });
  }, [cols, seedKey]);

  return (
    <div
      className={[
        "grid grid-flow-col grid-rows-4 content-center gap-x-1 gap-y-1",
        className,
      ].join(" ")}
      aria-hidden
    >
      {dots.map((d, i) => (
        <span
          key={`${seedKey}-${i}`}
          className={`h-1.5 w-1.5 rounded-full ${d.color}`}
          style={{ opacity: d.opacity }}
        />
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="h-[400px] w-full bg-black text-white">
      <div className="mx-auto flex w-full flex-col px-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-white/85">
            <a
              href="#"
              aria-label="Instagram"
              className="transition-opacity hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/insta.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 opacity-90"
              />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="transition-opacity hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/linkedin.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 opacity-90"
              />
            </a>
            <a
              href="mailto:hello@hanabi.co"
              aria-label="Email"
              className="transition-opacity hover:opacity-100"
            >
              <Image
                src="/icons/mail.svg"
                alt=""
                width={24}
                height={19}
                className="h-5 w-5 opacity-90"
              />
            </a>
            <a
              href="#"
              aria-label="Telegram"
              className="transition-opacity hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/telegram.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 opacity-90"
              />
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/80">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-white">Now accepting projects</span>
          </div>
        </div>

        <p className="mt-8 max-w-xs text-2xl text-white">
          The studio for brands who simply can't afford to be average
        </p>

        <div className="mt-8 flex items-center gap-3">
          <DotField
            seedKey="footer-dots-left"
            cols={44}
            className="h-7 flex-1"
          />

          <button className="bg-background font-inter relative cursor-pointer overflow-hidden rounded-md border border-white/10 px-2 py-1 text-sm font-medium text-black shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-transform duration-75 active:scale-[0.98]">
            Book an Intro call
          </button>

          <DotField
            seedKey="footer-dots-right"
            cols={44}
            className="h-7 flex-1"
          />
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-10 sm:gap-10">
          <Image
            src="/logo-dark.svg"
            alt="Hanabi"
            width={168}
            height={168}
            className="size-16 sm:size-24 md:size-32"
          />

          <div
            className={`${sawarabiGothic.className} pb-2 text-right text-4xl leading-[0.9] tracking-[-0.02em] sm:pb-3 sm:text-6xl md:text-7xl lg:text-9xl`}
          >
            Hanabi
          </div>
        </div>
      </div>
    </footer>
  );
}
