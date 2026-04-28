"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

type InlineMarqueeProps = {
  direction: "left" | "right";
  duration: number;
  children: ReactNode;
};

export function InlineMarquee({ direction, duration, children }: InlineMarqueeProps) {
  const xFrom = direction === "right" ? "-50%" : "0%";
  const xTo = direction === "right" ? "0%" : "-50%";
  const x = useMotionValue(xFrom);
  const playbackRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    x.set(xFrom);
    playbackRef.current = animate(x, [xFrom, xTo], {
      duration,
      repeat: Infinity,
      ease: "linear",
    });
    return () => {
      playbackRef.current?.stop();
      playbackRef.current = null;
    };
  }, [direction, duration, xFrom, xTo, x]);

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => playbackRef.current?.pause()}
      onMouseLeave={() => playbackRef.current?.play()}
    >
      <motion.div className="flex w-max" style={{ x }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}
