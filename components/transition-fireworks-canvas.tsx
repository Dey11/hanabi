"use client";

import { useEffect, useRef } from "react";

type Particle = {
  alpha: number;
  color: string;
  createdAt: number;
  lifespan: number;
  radius: number;
  vx: number;
  vy: number;
  x: number;
  xPrevious: number;
  y: number;
  yPrevious: number;
};

type Firework = {
  color: string;
  createdAt: number;
  explodedAt: number | null;
  particles: Particle[];
  radius: number;
  targetY: number;
  vx: number;
  vy: number;
  x: number;
  xPrevious: number;
  y: number;
  yPrevious: number;
};

const AIR_RESISTANCE = 1.8;
const GRAVITY = 42;
const MAX_PARTICLES = 110;
const FIREWORK_COLORWAYS = [
  ["#ff6a3d", "#ff8a4a", "#ffc25b", "#fff0b7"],
  ["#ff4f31", "#ff7d52", "#ffd36d", "#fff3c7"],
  ["#ff63b7", "#ff92d6", "#ffae6a", "#ffe39a"],
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function createFirework(width: number, height: number): Firework {
  const horizontalPadding = width * 0.16;
  const startX = randomBetween(horizontalPadding, width - horizontalPadding);
  const startY = height * 0.96;
  const targetX = clamp(
    startX + randomBetween(-width * 0.08, width * 0.08),
    horizontalPadding,
    width - horizontalPadding,
  );
  const targetY = randomBetween(height * 0.14, height * 0.52);
  const dx = targetX - startX;
  const dy = targetY - startY;
  const distance = Math.hypot(dx, dy) || 1;
  const speed = randomBetween(height * 0.82, height * 1.05);
  const colorway =
    FIREWORK_COLORWAYS[Math.floor(Math.random() * FIREWORK_COLORWAYS.length)];
  const color = colorway[Math.floor(Math.random() * colorway.length)];

  return {
    color,
    createdAt: performance.now(),
    explodedAt: null,
    particles: [],
    radius: randomBetween(1.35, 2),
    targetY,
    vx: (dx / distance) * speed,
    vy: (dy / distance) * speed,
    x: startX,
    xPrevious: startX,
    y: startY,
    yPrevious: startY,
  };
}

function explodeFirework(firework: Firework) {
  const now = performance.now();
  const colorway =
    FIREWORK_COLORWAYS[Math.floor(Math.random() * FIREWORK_COLORWAYS.length)];
  const count = Math.floor(randomBetween(14, 24));

  firework.explodedAt = now;
  firework.particles = Array.from({ length: count }, (_, index): Particle => {
    const angle = (Math.PI * 2 * index) / count + randomBetween(-0.16, 0.16);
    const speed = randomBetween(44, 112);
    const color = colorway[Math.floor(Math.random() * colorway.length)];

    return {
      alpha: 1,
      color,
      createdAt: now,
      lifespan: randomBetween(0.75, 1.45),
      radius: randomBetween(1.55, 3.05),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      x: firework.x,
      xPrevious: firework.x,
      y: firework.y,
      yPrevious: firework.y,
    };
  });
}

export default function TransitionFireworksCanvas({
  active = false,
}: {
  active?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let lastTime = performance.now();
    let nextLaunchIn = 0.18;
    let fireworks: Firework[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const drawTrail = ({
      alpha,
      color,
      radius,
      x,
      xPrevious,
      y,
      yPrevious,
    }: {
      alpha: number;
      color: string;
      radius: number;
      x: number;
      xPrevious: number;
      y: number;
      yPrevious: number;
    }) => {
      context.save();
      context.globalAlpha = alpha;
      context.lineCap = "round";
      context.lineWidth = radius * 2;
      context.strokeStyle = color;
      context.shadowBlur = 16;
      context.shadowColor = color;
      context.beginPath();
      context.moveTo(xPrevious, yPrevious);
      context.lineTo(x, y);
      context.stroke();
      context.restore();
    };

    const render = (time: number) => {
      if (!activeRef.current || document.visibilityState !== "visible") {
        fireworks = [];
        context.clearRect(0, 0, width, height);
        animationFrame = 0;
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.04);
      lastTime = time;
      nextLaunchIn -= dt;

      if (
        !prefersReducedMotion.matches &&
        nextLaunchIn <= 0 &&
        width > 0 &&
        height > 0 &&
        fireworks.length < 3
      ) {
        fireworks.push(createFirework(width, height));
        nextLaunchIn = randomBetween(0.72, 1.05);
      }

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";
      const drag = Math.exp(-AIR_RESISTANCE * dt);

      for (let index = fireworks.length - 1; index >= 0; index -= 1) {
        const firework = fireworks[index];

        if (firework.explodedAt === null) {
          firework.vx *= drag;
          firework.vy = firework.vy * drag + GRAVITY * dt;
          firework.x += firework.vx * dt;
          firework.y += firework.vy * dt;

          drawTrail({
            alpha: 0.9,
            color: firework.color,
            radius: firework.radius,
            x: firework.x,
            xPrevious: firework.xPrevious,
            y: firework.y,
            yPrevious: firework.yPrevious,
          });

          const age = time - firework.createdAt;
          const shouldExplode =
            firework.y <= firework.targetY ||
            firework.vy >= -18 ||
            age >= randomBetween(1050, 1550);

          firework.xPrevious = firework.x;
          firework.yPrevious = firework.y;

          if (shouldExplode) {
            explodeFirework(firework);
          }
          continue;
        }

        const particleAge = (time - firework.explodedAt) / 1000;

        for (
          let particleIndex = firework.particles.length - 1;
          particleIndex >= 0;
          particleIndex -= 1
        ) {
          const particle = firework.particles[particleIndex];
          const progress = particleAge / particle.lifespan;

          if (progress >= 1) {
            firework.particles.splice(particleIndex, 1);
            continue;
          }

          particle.vx *= drag;
          particle.vy = particle.vy * drag + GRAVITY * dt;
          particle.x += particle.vx * dt;
          particle.y += particle.vy * dt;
          particle.alpha = Math.max(0, 1 - progress);

          drawTrail(particle);

          particle.xPrevious = particle.x;
          particle.yPrevious = particle.y;
        }

        if (firework.particles.length === 0) {
          fireworks.splice(index, 1);
        }
      }

      const particleCount = fireworks.reduce(
        (total, firework) => total + firework.particles.length,
        0,
      );
      if (particleCount > MAX_PARTICLES) {
        fireworks = fireworks.slice(-3);
      }

      context.globalCompositeOperation = "source-over";
      animationFrame = requestAnimationFrame(render);
    };

    const start = () => {
      if (animationFrame !== 0) return;
      lastTime = performance.now();
      animationFrame = requestAnimationFrame(render);
    };

    const stop = () => {
      if (animationFrame !== 0) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
      fireworks = [];
      context.clearRect(0, 0, width, height);
    };

    const activeWatcher = window.setInterval(() => {
      if (activeRef.current) {
        start();
      } else {
        stop();
      }
    }, 250);

    if (activeRef.current) {
      start();
    }

    return () => {
      window.clearInterval(activeWatcher);
      stop();
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
