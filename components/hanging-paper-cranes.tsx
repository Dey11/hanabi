"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type CranePalette = {
  wing: string;
  wingShadow: string;
  body: string;
  fold: string;
};

type CraneSpec = {
  top: number;
  offset: number;
  rotate: number;
  scale: number;
  flip?: boolean;
  palette: CranePalette;
};

const leftCranes: CraneSpec[] = [
  {
    top: 34,
    offset: 0,
    rotate: -8,
    scale: 0.84,
    palette: {
      wing: "#FFB39F",
      wingShadow: "#FF6B52",
      body: "#FFD4C9",
      fold: "#FF8A6F",
    },
  },
  {
    top: 124,
    offset: 0,
    rotate: 5,
    scale: 0.78,
    flip: true,
    palette: {
      wing: "#FFC874",
      wingShadow: "#FF9900",
      body: "#FFE2A9",
      fold: "#FFB452",
    },
  },
  {
    top: 216,
    offset: 0,
    rotate: -4,
    scale: 0.82,
    palette: {
      wing: "#FF8A6F",
      wingShadow: "#FF2500",
      body: "#FFC1B5",
      fold: "#FF6348",
    },
  },
  {
    top: 310,
    offset: 0,
    rotate: 8,
    scale: 0.76,
    flip: true,
    palette: {
      wing: "#FFE0A7",
      wingShadow: "#FFB24D",
      body: "#FFF0C9",
      fold: "#FFC874",
    },
  },
];

const rightCranes: CraneSpec[] = [
  {
    top: 58,
    offset: 0,
    rotate: 7,
    scale: 0.82,
    flip: true,
    palette: {
      wing: "#FFD0BF",
      wingShadow: "#FF7A5F",
      body: "#FFE4DC",
      fold: "#FFA083",
    },
  },
  {
    top: 166,
    offset: 0,
    rotate: -7,
    scale: 0.79,
    palette: {
      wing: "#FFAA52",
      wingShadow: "#FF6A00",
      body: "#FFD79B",
      fold: "#FF9900",
    },
  },
  {
    top: 274,
    offset: 0,
    rotate: 3,
    scale: 0.84,
    flip: true,
    palette: {
      wing: "#FF765F",
      wingShadow: "#FF2500",
      body: "#FFB6A7",
      fold: "#FF593E",
    },
  },
];

const ropeSpring = {
  stiffness: 42,
  damping: 4.8,
  mass: 1.05,
};

function craneAmplitude(crane: CraneSpec, stringEnd: number) {
  const falloff = Math.max(0.12, crane.top / stringEnd);

  return 7 + Math.pow(falloff, 1.5) * 48;
}

function ropePath(points: { x: number; y: number }[]) {
  if (points.length < 2) {
    return "";
  }

  const [first, ...rest] = points;
  const path = [`M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`];

  rest.forEach((point, index) => {
    const previous = points[index];
    const midY = previous.y + (point.y - previous.y) * 0.5;

    path.push(
      `C ${previous.x.toFixed(2)} ${midY.toFixed(2)}, ${point.x.toFixed(
        2,
      )} ${midY.toFixed(2)}, ${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
    );
  });

  return path.join(" ");
}

export default function HangingPaperCranes({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative z-10 h-[330px] w-full sm:h-[390px] md:h-[430px]",
        className,
      )}
    >
      <Garland side="left" cranes={leftCranes} />
      <Garland side="right" cranes={rightCranes} />
    </div>
  );
}

function Garland({
  side,
  cranes,
}: {
  side: "left" | "right";
  cranes: CraneSpec[];
}) {
  const reduceMotion = useReducedMotion();
  const releaseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stringEnd = Math.max(...cranes.map((crane) => crane.top));
  const pointTarget0 = useMotionValue(0);
  const pointTarget1 = useMotionValue(0);
  const pointTarget2 = useMotionValue(0);
  const pointTarget3 = useMotionValue(0);
  const pointSpring0 = useSpring(pointTarget0, ropeSpring);
  const pointSpring1 = useSpring(pointTarget1, ropeSpring);
  const pointSpring2 = useSpring(pointTarget2, ropeSpring);
  const pointSpring3 = useSpring(pointTarget3, ropeSpring);
  const rotateTarget0 = useMotionValue(0);
  const rotateTarget1 = useMotionValue(0);
  const rotateTarget2 = useMotionValue(0);
  const rotateTarget3 = useMotionValue(0);
  const rotateSpring0 = useSpring(rotateTarget0, {
    stiffness: 38,
    damping: 5.6,
    mass: 0.9,
  });
  const rotateSpring1 = useSpring(rotateTarget1, {
    stiffness: 38,
    damping: 5.6,
    mass: 0.9,
  });
  const rotateSpring2 = useSpring(rotateTarget2, {
    stiffness: 38,
    damping: 5.6,
    mass: 0.9,
  });
  const rotateSpring3 = useSpring(rotateTarget3, {
    stiffness: 38,
    damping: 5.6,
    mass: 0.9,
  });
  const pointTargets = [pointTarget0, pointTarget1, pointTarget2, pointTarget3];
  const pointSprings = [pointSpring0, pointSpring1, pointSpring2, pointSpring3];
  const rotateTargets = [
    rotateTarget0,
    rotateTarget1,
    rotateTarget2,
    rotateTarget3,
  ];
  const rotateSprings = [
    rotateSpring0,
    rotateSpring1,
    rotateSpring2,
    rotateSpring3,
  ];

  useEffect(() => {
    return () => {
      if (releaseTimeoutRef.current) {
        clearTimeout(releaseTimeoutRef.current);
      }
    };
  }, []);

  const buildRopePath = () => {
    const points = [
      { x: 80, y: 0 },
      ...cranes.map((crane, index) => ({
        x: 80 + pointSprings[index].get(),
        y: crane.top,
      })),
    ];
    return ropePath(points);
  };

  const [pathD, setPathD] = useState(() => buildRopePath());

  useMotionValueEvent(pointSprings[0], "change", () => setPathD(buildRopePath()));
  useMotionValueEvent(pointSprings[1], "change", () => setPathD(buildRopePath()));
  useMotionValueEvent(pointSprings[2], "change", () => setPathD(buildRopePath()));
  useMotionValueEvent(pointSprings[3], "change", () => setPathD(buildRopePath()));

  const releaseRope = (delay = 120) => {
    if (releaseTimeoutRef.current) {
      clearTimeout(releaseTimeoutRef.current);
    }

    releaseTimeoutRef.current = setTimeout(() => {
      pointTargets.forEach((target) => target.set(0));
      rotateTargets.forEach((target) => target.set(0));
      releaseTimeoutRef.current = null;
    }, delay);
  };

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute top-0 h-full w-24 origin-top sm:w-32 md:w-40",
        side === "left"
          ? "left-[-0.65rem] sm:left-2 md:left-5 lg:left-8"
          : "right-[-0.65rem] sm:right-2 md:right-5 lg:right-8",
      )}
    >
      <motion.svg
        className="absolute top-0 left-1/2 w-full -translate-x-1/2 overflow-visible"
        viewBox={`0 0 160 ${stringEnd}`}
        preserveAspectRatio="none"
        style={{ height: stringEnd }}
      >
        <path
          d={pathD}
          fill="none"
          stroke="#FF9DAE"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </motion.svg>
      {cranes.map((crane, index) => (
        <div
          key={`${side}-${crane.top}-${index}`}
          className="absolute"
          style={{
            top: crane.top,
            left: `calc(50% + ${crane.offset}px)`,
            transform: "translateX(-50%)",
          }}
        >
          <motion.div
            style={{
              x: pointSprings[index],
              rotate: rotateSprings[index],
              transformOrigin: "50% 4px",
            }}
          >
            <div
              style={{
                transform: `rotate(${crane.rotate}deg) scale(${
                  crane.flip ? -crane.scale : crane.scale
                }, ${crane.scale})`,
              }}
              className="w-[66px] origin-top [filter:drop-shadow(0_8px_10px_rgba(38,22,18,0.14))_drop-shadow(0_1px_0_rgba(255,255,255,0.5))] sm:w-[78px] md:w-[90px]"
            >
              <PaperCrane palette={crane.palette} />
            </div>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

function PaperCrane({ palette }: { palette: CranePalette }) {
  return (
    <svg
      width="626"
      height="447"
      viewBox="0 0 626 447"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
    >
      <path
        d="M0 134.137C5.94033 133.465 12.8952 133.368 18.9498 133.142C64.7445 172.192 128 220.5 172.68 256.321C170.5 302 167.815 345 165.117 389.063C165.771 395.45 167 410 167.815 415.811C155 392 128.428 343.703 113.802 318.684C77.8703 257.228 40.4366 192.513 0 134.137Z"
        fill={palette.wing}
      />
      <path
        d="M513.034 88.2051C521.056 88.9559 550.5 94 556.159 95.0094C550.13 102.548 526.413 165.776 526.597 173.183C501.973 231.505 473.108 288.213 449.756 347.347C441.5 363 408.5 431 399.488 445.813C399.5 435 399.654 315.144 396.95 292.364C388.5 270.5 379.5 251.5 375.893 239.625C388.159 229.01 407.661 205.68 418.773 192.696C436.379 172.277 454.225 152.065 472.307 132.066C484.553 118.285 500.5 101.5 513.034 88.2051Z"
        fill={palette.wing}
      />
      <path
        d="M556.159 95.0146C565.397 103.556 624.878 197.26 625.366 205.024C625.44 206.214 625.265 207.295 624.95 208.435C610.327 219.876 545.263 179.839 526.597 173.189C526.413 165.781 550.13 102.553 556.159 95.0146Z"
        fill={palette.wingShadow}
      />
      <path
        d="M396.951 292.362C389.5 272.5 379 248 375.894 239.623L291 0L172.681 256.321C167.5 269 162.5 279.5 157 292.362C157 325 163.834 355.5 165.118 389.062C165.772 395.45 167 410.5 167.816 415.811C172.343 426.33 179.032 436.895 182.792 446.844H291C299.5 446.844 387 445.811 399.489 445.811C399.489 436 399.655 315.143 396.951 292.362Z"
        fill={palette.body}
      />
      <path
        d="M172.681 256.321L291 0L375.894 239.623C353.377 259.543 327.301 279.843 291.43 292.362H157C162.5 279.5 167.5 269 172.681 256.321Z"
        fill={palette.fold}
        opacity="0.58"
      />
    </svg>
  );
}
