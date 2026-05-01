"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type SeamlessMarqueeProps = {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  speed?: number;
};

export function SeamlessMarquee({
  children,
  className = "",
  direction = "left",
  pauseOnHover = true,
  speed = 64,
}: SeamlessMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef(0);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;

    if (!track || !group) {
      return;
    }

    let frameId = 0;
    let lastTime = 0;

    const measure = () => {
      const nextDistance = group.getBoundingClientRect().width;

      if (nextDistance <= 0) {
        return;
      }

      distanceRef.current = nextDistance;
      offsetRef.current %= nextDistance;
    };

    const observer = new ResizeObserver(measure);
    observer.observe(group);
    measure();

    const tick = (time: number) => {
      if (lastTime === 0) {
        lastTime = time;
      }

      const elapsed = (time - lastTime) / 1000;
      lastTime = time;

      const distance = distanceRef.current;

      if (distance > 0 && !pausedRef.current) {
        offsetRef.current = (offsetRef.current + elapsed * speed) % distance;

        const offset =
          direction === "left"
            ? -offsetRef.current
            : offsetRef.current - distance;

        track.style.transform = `translate3d(${offset}px, 0, 0)`;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [direction, speed]);

  return (
    <div
      className={`overflow-hidden ${className}`}
      onPointerEnter={() => {
        if (pauseOnHover) {
          pausedRef.current = true;
        }
      }}
      onPointerLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div ref={groupRef} className="flex shrink-0">
          {children}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
