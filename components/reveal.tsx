"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const revealItem = {
  hidden: { opacity: 0, y: 14, filter: "blur(12px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
} satisfies Variants;

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function Reveal({
  children,
  className,
  delay = 0,
  viewportAmount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  viewportAmount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={revealItem}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: viewportAmount }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

