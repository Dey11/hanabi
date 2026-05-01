"use client";

import { SeamlessMarquee } from "@/components/seamless-marquee";
import type { ReactNode } from "react";

type InlineMarqueeProps = {
  direction: "left" | "right";
  speed: number;
  children: ReactNode;
};

export function InlineMarquee({
  direction,
  speed,
  children,
}: InlineMarqueeProps) {
  return (
    <SeamlessMarquee
      direction={direction}
      speed={speed}
      className="w-full overflow-hidden"
    >
      {children}
    </SeamlessMarquee>
  );
}
