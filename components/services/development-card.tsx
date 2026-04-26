"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const ORBIT_RADIUS = 100;
const CIRCLE_SIZE = 40;
const CIRCLE_COUNT = 12;

function ChakraOrbit() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none absolute -top-10 left-1/2"
      style={{ transform: "translateX(-50%)" }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ width: 0, height: 0, position: "relative" }}
      >
        {Array.from({ length: CIRCLE_COUNT }).map((_, i) => {
          const angle = (2 * Math.PI * i) / CIRCLE_COUNT;
          const x = ORBIT_RADIUS * Math.cos(angle);
          const y = ORBIT_RADIUS * Math.sin(angle);
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white/35 shadow-sm inset-shadow-2xs inset-shadow-white/40"
              style={{
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                left: x - CIRCLE_SIZE / 2,
                top: y - CIRCLE_SIZE / 2,
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

export function DevelopmentCard() {
  return (
    <div
      style={{
        backgroundImage: "url('/gradients/mesh1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative flex size-[400px] flex-col overflow-hidden rounded-2xl bg-white"
    >
      <ChakraOrbit />
      <div className="flex-1">
        <Image
          src="/logo-dark.png"
          alt="Hanabi Logo"
          width={100}
          height={100}
          className="absolute inset-x-0 top-1/4 m-auto"
        />
      </div>
      <div className="w-full px-5">
        <div className="flex items-center justify-start gap-2 pb-0.5">
          <div className="rounded-full bg-emerald-950/55 px-4 py-1 text-sm font-medium text-white shadow-sm inset-shadow-2xs inset-shadow-white/10 backdrop-blur-sm text-shadow-2xs">
            Automation
          </div>
          <div className="rounded-full bg-emerald-950/55 px-4 py-1 text-sm font-medium text-white shadow-sm inset-shadow-2xs inset-shadow-white/10 backdrop-blur-sm text-shadow-2xs">
            Web & App
          </div>
          <div className="rounded-full bg-emerald-950/55 px-4 py-1 text-sm font-medium text-white shadow-sm inset-shadow-2xs inset-shadow-white/10 backdrop-blur-sm text-shadow-2xs">
            MVP
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 p-5 pt-4">
        <h4 className="text-2xl font-medium">Development</h4>
        <p>
          We craft beautiful, intuitive interfaces for websites, apps, and
          digital platforms.
        </p>
      </div>
    </div>
  );
}
