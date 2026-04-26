"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type HoveredIndex = 0 | 1 | 2 | null;

const SPRING = {
  type: "spring" as const,
  stiffness: 260,
  damping: 18,
  mass: 0.75,
  bounce: 0.5,
};

function isActive(hovered: HoveredIndex, i: 0 | 1 | 2) {
  return hovered === i;
}

function isInactive(hovered: HoveredIndex, i: 0 | 1 | 2) {
  return hovered !== null && hovered !== i;
}

export function BrandingCard() {
  const [cardHovered, setCardHovered] = useState<HoveredIndex>(null);
  return (
    <div
      style={{
        backgroundImage: "url('/gradients/mesh3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative flex size-[400px] flex-col rounded-2xl"
    >
      <div className="relative flex flex-1 flex-col">
        <div className="relative h-full rotate-0">
          <div
            className="absolute inset-0"
            onMouseLeave={() => setCardHovered(null)}
          >
            <motion.div
              onMouseEnter={() => setCardHovered(0)}
              animate={{
                x: isActive(cardHovered, 0)
                  ? 10
                  : isInactive(cardHovered, 0)
                    ? -8
                    : 0,
                y: isActive(cardHovered, 0)
                  ? -34
                  : isInactive(cardHovered, 0)
                    ? 10
                    : 0,
                scale: isActive(cardHovered, 0)
                  ? 1.18
                  : isInactive(cardHovered, 0)
                    ? 0.96
                    : 1,
                rotate: isActive(cardHovered, 0)
                  ? -5
                  : isInactive(cardHovered, 0)
                    ? -22
                    : -15,
                opacity: isInactive(cardHovered, 0) ? 0.85 : 1,
                zIndex: isActive(cardHovered, 0)
                  ? 30
                  : isInactive(cardHovered, 0)
                    ? 10
                    : 20,
              }}
              transition={SPRING}
              className={cn(
                "absolute top-[40px] left-[35px] h-[200px] w-[200px] overflow-hidden rounded-none shadow-[0_28px_50px_-28px_rgba(0,0,0,0.65)] will-change-transform",
              )}
            >
              <Image
                src="/Hanabi-branding/Desktop - 144.png"
                alt="Ballarat Box Sports"
                width={1024}
                height={768}
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>

            <motion.div
              onMouseEnter={() => setCardHovered(1)}
              animate={{
                x: isActive(cardHovered, 1)
                  ? 0
                  : isInactive(cardHovered, 1)
                    ? -10
                    : 0,
                y: isActive(cardHovered, 1)
                  ? -44
                  : isInactive(cardHovered, 1)
                    ? 12
                    : 0,
                scale: isActive(cardHovered, 1)
                  ? 1.2
                  : isInactive(cardHovered, 1)
                    ? 0.96
                    : 1,
                rotate: isActive(cardHovered, 1)
                  ? 0
                  : isInactive(cardHovered, 1)
                    ? -10
                    : -4,
                opacity: isInactive(cardHovered, 1) ? 0.85 : 1,
                zIndex: isActive(cardHovered, 1)
                  ? 30
                  : isInactive(cardHovered, 1)
                    ? 10
                    : 20,
              }}
              transition={SPRING}
              className="absolute top-[35px] left-[106px] h-[200px] w-[200px] overflow-hidden rounded-none shadow-[0_26px_46px_-28px_rgba(0,0,0,0.7)] will-change-transform"
            >
              <Image
                src="/Hanabi-branding/Desktop - 113.png"
                alt="Nectar"
                width={1024}
                height={768}
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>

            <motion.div
              onMouseEnter={() => setCardHovered(2)}
              animate={{
                x: isActive(cardHovered, 2)
                  ? -34
                  : isInactive(cardHovered, 2)
                    ? 12
                    : 0,
                y: isActive(cardHovered, 2)
                  ? -34
                  : isInactive(cardHovered, 2)
                    ? 10
                    : 0,
                scale: isActive(cardHovered, 2)
                  ? 1.18
                  : isInactive(cardHovered, 2)
                    ? 0.96
                    : 1,
                rotate: isActive(cardHovered, 2)
                  ? 5
                  : isInactive(cardHovered, 2)
                    ? 16
                    : 12,
                opacity: isInactive(cardHovered, 2) ? 0.85 : 1,
                zIndex: isActive(cardHovered, 2)
                  ? 30
                  : isInactive(cardHovered, 2)
                    ? 10
                    : 20,
              }}
              transition={SPRING}
              className="absolute top-[50px] right-[30px] h-[200px] w-[200px] overflow-hidden rounded-none shadow-[0_28px_50px_-28px_rgba(0,0,0,0.65)]"
            >
              <Image
                src="/Hanabi-branding/Hanabi 6.png"
                alt="Hibari"
                width={1024}
                height={768}
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-transparent to-[#21823C] blur-[80px]" />
          <div className="relative z-20">
            <div className="px-5">
              {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[240px] bg-linear-to-b from-transparent via-emerald-950/15 to-emerald-950/75" /> */}

              <div className="relative z-10 flex items-center gap-2 pb-0.5">
                <div className="rounded-full bg-emerald-950/55 px-4 py-1 text-sm font-medium text-white shadow-sm inset-shadow-2xs inset-shadow-white/10 backdrop-blur-sm text-shadow-2xs">
                  Logo & Brand Identity
                </div>
                <div className="rounded-full bg-emerald-950/55 px-4 py-1 text-sm font-medium text-white shadow-sm inset-shadow-2xs inset-shadow-white/10 backdrop-blur-sm text-shadow-2xs">
                  Brand Strategy
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-5 pt-4">
              <h4 className="text-2xl font-medium text-black">Branding</h4>
              <p className="text-black/90">
                We craft beautiful, intuitive interfaces for websites, apps, and
                digital platforms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
