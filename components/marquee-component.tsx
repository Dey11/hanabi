"use client";

import { motion } from "motion/react";
import Image from "next/image";

const marqueeItems = ["nectar", "pdx", "tuf"];

const MARQUEE_DURATION = 20;

function MarqueeSet({
  items,
  suffix = "",
}: {
  items: string[];
  suffix?: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-10 py-10">
      {items.map((item, idx) => (
        <Image
          key={`${item}-${idx}${suffix}`}
          src={`/hero-projects/${item}.png`}
          alt={item}
          width={300}
          height={100}
          className="h-80 w-auto shrink-0 object-cover"
        />
      ))}
    </div>
  );
}

export default function MarqueeComponent() {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <motion.div
        className="flex w-max"
        initial={{ x: 0 }}
        animate={{ x: "-25%" }}
        transition={{
          duration: MARQUEE_DURATION,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        <MarqueeSet items={marqueeItems} />
        <MarqueeSet items={marqueeItems} suffix="-dup" />
        <MarqueeSet items={marqueeItems} suffix="-dup-2" />
        <MarqueeSet items={marqueeItems} suffix="-dup-3" />
      </motion.div>
    </div>
  );
}
