"use client";

import Image from "next/image";
import { memo } from "react";
import Marquee from "react-fast-marquee";

const MARQUEE_SPEED = 64;

const MarqueeItem = memo(function MarqueeItem({
  item,
  index,
}: {
  item: string;
  index: number;
}) {
  const isAboveFold = index < 4;

  return (
    <div className="shrink-0 pr-6 sm:pr-10">
      <Image
        src={`/hero-projects/${item}.png`}
        alt={item}
        width={260}
        height={90}
        sizes="(max-width: 640px) 65vw, (max-width: 768px) 45vw, 260px"
        className="h-52 w-auto shrink-0 rounded-lg object-cover sm:h-72 md:h-80"
        loading={isAboveFold ? "eager" : "lazy"}
        priority={isAboveFold}
      />
    </div>
  );
});

export default function MarqueeComponent({ items }: { items: string[] }) {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <Marquee
        autoFill
        gradient={false}
        pauseOnHover
        speed={MARQUEE_SPEED}
        className="will-change-transform"
      >
        {items.map((item, index) => (
          <MarqueeItem key={`${item}-${index}`} item={item} index={index} />
        ))}
      </Marquee>
    </div>
  );
}
