"use client";

import Image from "next/image";
import { memo, useEffect, useState } from "react";

const BASE_DURATION = 20;

const MarqueeSet = memo(function MarqueeSet({
  items,
  eagerCount = 0,
  suffix = "",
}: {
  items: string[];
  eagerCount?: number;
  suffix?: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-6 py-6 sm:gap-10 sm:py-10">
      {items.map((item, idx) => {
        const isAboveFold = idx < eagerCount;

        return (
          <Image
            key={`${item}-${idx}${suffix}`}
            src={`/hero-projects/${item}.png`}
            alt={item}
            width={260}
            height={90}
            sizes="(max-width: 640px) 65vw, (max-width: 768px) 45vw, 260px"
            className="h-52 w-auto shrink-0 rounded-lg object-cover sm:h-72 md:h-80"
            loading={isAboveFold ? "eager" : "lazy"}
            priority={isAboveFold}
          />
        );
      })}
    </div>
  );
});

export default function MarqueeComponent({ items }: { items: string[] }) {
  const duration = Math.max(20, (BASE_DURATION * items.length) / 3);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden px-4 sm:px-8">
      <div
        className="flex w-max will-change-transform"
        style={
          isReady
            ? {
                animation: `marquee-scroll ${duration}s linear infinite`,
              }
            : undefined
        }
      >
        <MarqueeSet items={items} eagerCount={4} />
        <MarqueeSet items={items} suffix="-dup" />
        <MarqueeSet items={items} suffix="-dup-2" />
        <MarqueeSet items={items} suffix="-dup-3" />
      </div>
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </div>
  );
}