"use client";

import { useCalPopup } from "@/components/cal-popup-button";

export default function FooterLiquidGlassButton() {
  const { openPopup, popup } = useCalPopup();

  return (
    <>
      <button
        type="button"
        aria-label="Book an intro call"
        className="font-inter group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/80 px-4 py-1.5 text-sm font-medium text-neutral-950 shadow-[0_0_18px_rgba(255,255,255,0.12)] transition-transform duration-50 active:scale-95 sm:px-5 sm:py-2 sm:text-base"
        onClick={openPopup}
      >
        <span
          className="absolute inset-0 bg-linear-to-b from-white from-30% via-50% to-neutral-200 to-80% inset-shadow-2xs inset-shadow-white"
          aria-hidden
        />
        <span
          className="absolute inset-0 bg-linear-to-t from-neutral-200 from-30% via-80% to-white to-120% opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-full inset-shadow-sm inset-shadow-white/90"
          aria-hidden
        />
        <span className="relative z-10 text-shadow-white/80 text-shadow-xs">
          Book an Intro call
        </span>
      </button>

      {popup}
    </>
  );
}
