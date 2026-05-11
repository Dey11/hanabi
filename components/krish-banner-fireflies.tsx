"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Firefly = {
  delay: string;
  driftX: string;
  driftY: string;
  duration: string;
  left: string;
  size: string;
  tone: "yellow" | "orange";
  top: string;
};

const fixedFireflies: Firefly[] = [
  {
    left: "7%",
    top: "18%",
    size: "2.5px",
    delay: "-0.2s",
    duration: "4.8s",
    driftX: "0.5px",
    driftY: "-4px",
    tone: "yellow",
  },
  {
    left: "14%",
    top: "72%",
    size: "2px",
    delay: "-1.4s",
    duration: "5.6s",
    driftX: "-0.25px",
    driftY: "-5px",
    tone: "yellow",
  },
  {
    left: "25%",
    top: "36%",
    size: "3px",
    delay: "-0.8s",
    duration: "5.2s",
    driftX: "0.25px",
    driftY: "-3.5px",
    tone: "yellow",
  },
  {
    left: "38%",
    top: "78%",
    size: "1.8px",
    delay: "-2.1s",
    duration: "6.1s",
    driftX: "-0.35px",
    driftY: "-4.5px",
    tone: "yellow",
  },
  {
    left: "51%",
    top: "22%",
    size: "3.5px",
    delay: "-1.7s",
    duration: "5.4s",
    driftX: "0.35px",
    driftY: "-5.5px",
    tone: "yellow",
  },
  {
    left: "63%",
    top: "61%",
    size: "2px",
    delay: "-0.5s",
    duration: "6.4s",
    driftX: "-0.25px",
    driftY: "-3.5px",
    tone: "yellow",
  },
  {
    left: "75%",
    top: "32%",
    size: "2.8px",
    delay: "-3.2s",
    duration: "5.8s",
    driftX: "0.25px",
    driftY: "-4px",
    tone: "yellow",
  },
  {
    left: "84%",
    top: "78%",
    size: "2px",
    delay: "-2.6s",
    duration: "6.8s",
    driftX: "-0.35px",
    driftY: "-4.5px",
    tone: "yellow",
  },
  {
    left: "92%",
    top: "24%",
    size: "2.4px",
    delay: "-4.1s",
    duration: "5.9s",
    driftX: "0.25px",
    driftY: "-3.5px",
    tone: "yellow",
  },
  {
    left: "94%",
    top: "58%",
    size: "1.75px",
    delay: "-3.7s",
    duration: "6.5s",
    driftX: "-0.25px",
    driftY: "-4px",
    tone: "yellow",
  },
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function withRandomOrangeFixedFireflies(count = 2): Firefly[] {
  const orangeIndexes = new Set<number>();

  while (orangeIndexes.size < count) {
    orangeIndexes.add(Math.floor(Math.random() * fixedFireflies.length));
  }

  return fixedFireflies.map((firefly, index): Firefly => {
    return {
      ...firefly,
      tone: orangeIndexes.has(index) ? "orange" : "yellow",
    };
  });
}

function createRandomFireflies(count = 4) {
  return Array.from({ length: count }, (): Firefly => {
    return {
      delay: `${randomBetween(-7, 0).toFixed(2)}s`,
      driftX: `${randomBetween(-0.5, 0.5).toFixed(2)}px`,
      driftY: `${randomBetween(-6, -2.5).toFixed(2)}px`,
      duration: `${randomBetween(4.4, 7.2).toFixed(2)}s`,
      left: `${randomBetween(6, 94).toFixed(2)}%`,
      size: `${randomBetween(1.6, 4).toFixed(2)}px`,
      tone: "yellow",
      top: `${randomBetween(14, 84).toFixed(2)}%`,
    };
  });
}

export default function KrishBannerFireflies() {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    setFireflies([
      ...withRandomOrangeFixedFireflies(),
      ...createRandomFireflies(),
    ]);
  }, []);

  return (
    <>
      {fireflies.map((firefly, index) => (
        <span
          key={`${firefly.left}-${firefly.top}-${index}`}
          className="krish-banner-firefly"
          style={
            {
              left: firefly.left,
              top: firefly.top,
              width: firefly.size,
              height: firefly.size,
              "--delay": firefly.delay,
              "--duration": firefly.duration,
              "--drift-x": firefly.driftX,
              "--drift-y": firefly.driftY,
              "--firefly-color":
                firefly.tone === "orange" ? "#ff8a32" : "#ffe27a",
              "--firefly-glow":
                firefly.tone === "orange" ? "255 138 50" : "255 226 122",
              "--firefly-halo":
                firefly.tone === "orange" ? "255 74 25" : "255 136 43",
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}
