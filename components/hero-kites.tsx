"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

export default function HeroKites() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Lenis already smooths the scroll signal, so we drive the parallax directly
  // from scrollYProgress — an extra useSpring here just double-smooths and adds
  // a second rAF loop fighting Lenis, which is what made the hero stutter.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "185%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "88%"]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [0, -22]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [0, 18]);

  const leftStyle = prefersReducedMotion
    ? undefined
    : { y: leftY, rotate: leftRotate };
  const rightStyle = prefersReducedMotion
    ? undefined
    : { y: rightY, rotate: rightRotate };

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      <motion.div
        style={leftStyle}
        className="absolute top-[22%] left-[2%] w-[110px] sm:left-[4%] sm:w-[140px] md:w-[170px] lg:left-[6%] lg:w-[190px]"
      >
        <motion.div
          initial={
            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -60 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src="/kite1.svg"
            alt=""
            width={152}
            height={317}
            loading="eager"
            fetchPriority="high"
            className="h-auto w-full select-none"
          />
        </motion.div>
      </motion.div>

      <motion.div
        style={rightStyle}
        className="absolute top-[18%] right-[2%] w-[120px] sm:right-[4%] sm:w-[150px] md:w-[180px] lg:right-[6%] lg:w-[210px]"
      >
        <motion.div
          initial={
            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -80 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src="/kite2.svg"
            alt=""
            width={152}
            height={317}
            loading="eager"
            fetchPriority="high"
            className="h-auto w-full select-none"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
