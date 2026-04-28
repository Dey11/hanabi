"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export default function HeroKites() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const leftY = useTransform(smoothProgress, [0, 1], ["0%", "140%"]);
  const rightY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const leftRotate = useTransform(smoothProgress, [0, 1], [0, -16]);
  const rightRotate = useTransform(smoothProgress, [0, 1], [0, 12]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      <motion.div
        style={{ y: leftY, rotate: leftRotate }}
        className="absolute top-[22%] left-[2%] w-[110px] sm:left-[4%] sm:w-[140px] md:w-[170px] lg:left-[6%] lg:w-[190px]"
      >
        <motion.div
          initial={{ opacity: 0, y: -60 }}
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
            priority
            className="h-auto w-full select-none"
          />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: rightY, rotate: rightRotate }}
        className="absolute top-[18%] right-[2%] w-[120px] sm:right-[4%] sm:w-[150px] md:w-[180px] lg:right-[6%] lg:w-[210px]"
      >
        <motion.div
          initial={{ opacity: 0, y: -80 }}
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
            priority
            className="h-auto w-full select-none"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
