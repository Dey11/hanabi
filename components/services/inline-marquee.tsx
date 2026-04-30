"use client";

import type { ReactNode } from "react";
import Marquee from "react-fast-marquee";

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
    <Marquee
      autoFill
      direction={direction}
      gradient={false}
      pauseOnHover
      speed={speed}
      className="w-full overflow-hidden"
    >
      {children}
    </Marquee>
  );
}
