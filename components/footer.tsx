import { CalPopupButton } from "@/components/cal-popup-button";
import { EMAIL, INSTAGRAM, LINKEDIN, TELEGRAM } from "@/lib/constants";
import type { CSSProperties } from "react";
import { Sawarabi_Gothic } from "next/font/google";
import Image from "next/image";

const sawarabiGothic = Sawarabi_Gothic({
  weight: "400",
  subsets: ["latin"],
});

const ROW_CLASS: Record<number, string> = {
  4: "grid-rows-4",
  8: "grid-rows-8",
};

type FooterDotStyle = CSSProperties & {
  "--footer-dot-col": number;
  "--footer-dot-pos": number;
};

function DotField({
  seedKey,
  cols,
  rows = 4,
  direction = "left-to-right",
  className,
}: {
  seedKey: string;
  cols: number;
  rows?: 4 | 8;
  direction?: "left-to-right" | "right-to-left";
  className?: string;
}) {
  const total = rows * cols;

  return (
    <div
      className={[
        "footer-dotmatrix grid grid-flow-col content-center gap-x-1 gap-y-1 text-white",
        ROW_CLASS[rows],
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      {Array.from({ length: total }, (_, index) => {
        const row = index % rows;
        const col = Math.floor(index / rows);
        const columnProgress = cols > 1 ? col / (cols - 1) : 0;
        const position = col % 2 === 0 ? rows - 1 - row : row;
        const style: FooterDotStyle = {
          "--footer-dot-col":
            direction === "right-to-left" ? 1 - columnProgress : columnProgress,
          "--footer-dot-pos": rows > 1 ? position / (rows - 1) : 0,
        };

        return (
          <span
            key={`${seedKey}-${index}`}
            className="footer-dotmatrix-dot h-1.5 w-1.5 rounded-full"
            style={style}
          />
        );
      })}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="h-[400px] w-full bg-black text-white">
      <div className="mx-auto flex w-full flex-col px-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-white/85">
            <a
              href={INSTAGRAM}
              aria-label="Instagram"
              className="transition-opacity hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/insta.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 opacity-90"
              />
            </a>
            <a
              href={LINKEDIN}
              aria-label="LinkedIn"
              className="transition-opacity hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/linkedin.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 opacity-90"
              />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="transition-opacity hover:opacity-100"
            >
              <Image
                src="/icons/mail.svg"
                alt=""
                width={24}
                height={19}
                className="h-5 w-5 opacity-90"
              />
            </a>
            <a
              href={TELEGRAM}
              aria-label="Telegram"
              className="transition-opacity hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/telegram.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 opacity-90"
              />
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/80">
            <span className="relative flex size-2 animate-pulse">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-white">Now accepting projects</span>
          </div>
        </div>

        <p className="mt-8 max-w-xs text-2xl text-white">
          The agency for building standout scalable digital experiences
        </p>

        <div className="relative mt-8 sm:hidden">
          <DotField
            seedKey="footer-dots-mobile"
            cols={28}
            rows={8}
            className="h-20 w-full overflow-hidden"
          />
          <CalPopupButton className="bg-background font-inter absolute top-1/2 left-1/2 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-md border border-white/10 px-3 py-1.5 text-center text-sm font-medium whitespace-nowrap text-black shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-transform duration-75 active:scale-[0.98]">
            Book an Intro call
          </CalPopupButton>
        </div>

        <div className="mt-8 hidden items-center gap-3 sm:flex">
          <DotField
            seedKey="footer-dots-left"
            cols={44}
            className="h-10 min-w-0 flex-1 overflow-hidden"
          />

          <CalPopupButton className="bg-background font-inter relative shrink-0 cursor-pointer overflow-hidden rounded-md border border-white/10 px-3 py-1.5 text-sm font-medium whitespace-nowrap text-black shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-transform duration-75 active:scale-[0.98]">
            Book an Intro call
          </CalPopupButton>

          <DotField
            seedKey="footer-dots-right"
            cols={44}
            direction="right-to-left"
            className="h-10 min-w-0 flex-1 overflow-hidden"
          />
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-10 sm:gap-10">
          <Image
            src="/logo-dark.svg"
            alt="Hanabi"
            width={168}
            height={168}
            className="size-16 sm:size-24 md:size-32"
          />

          <div
            className={`${sawarabiGothic.className} pb-2 text-right text-4xl leading-[0.9] tracking-[-0.02em] sm:pb-3 sm:text-6xl md:text-7xl lg:text-9xl`}
          >
            Hanabi
          </div>
        </div>
      </div>
    </footer>
  );
}

/*
New footer kept commented out per request.

const FOOTER_IMAGE = "/footer.png";

type FireflyStyle = CSSProperties & {
  "--x": string;
  "--y": string;
  "--size": string;
  "--delay": string;
  "--duration": string;
  "--drift": string;
};

const FIREFLIES = [
  [7, 25, 3, -1.4, 7.8, 18],
  [12, 52, 2, -4.2, 9.4, -12],
  [16, 70, 2, -0.8, 8.6, 14],
  [22, 34, 3, -3.1, 10.2, -18],
  [27, 82, 2, -5.4, 8.2, 16],
  [33, 20, 2, -2.6, 9.8, -10],
  [36, 66, 3, -6.8, 11.2, 13],
  [64, 23, 2, -3.7, 9.6, -14],
  [68, 77, 2, -1.9, 8.8, 18],
  [73, 42, 3, -5.2, 10.4, -16],
  [79, 64, 2, -0.7, 7.9, 12],
  [84, 30, 2, -4.9, 9.1, -15],
  [89, 74, 3, -2.2, 10.8, 16],
  [94, 49, 2, -6.1, 8.4, -12],
] as const;

export function ImageFireflyFooter() {
  return (
    <footer
      id="footer"
      className="relative h-[460px] w-full overflow-hidden bg-black text-white sm:h-[520px]"
    >
      <img
        src={FOOTER_IMAGE}
        alt=""
        className="absolute top-1/2 left-1/2 h-[calc(100%+120px)] w-[calc(100%+150px)] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover opacity-95"
        draggable={false}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_20%,rgba(0,0,0,0.22)_43%,rgba(0,0,0,0.72)_78%,#000_100%)]" />
      <div className="absolute inset-0 shadow-[inset_0_0_150px_52px_rgba(0,0,0,0.96)] sm:shadow-[inset_0_0_210px_76px_rgba(0,0,0,0.98)]" />

      <div className="absolute inset-x-0 top-[17%] flex justify-center">
        <p
          className={`${sawarabiGothic.className} bg-linear-to-b from-[#ff2bc0] to-[#ff67d2] bg-clip-text text-6xl leading-none tracking-normal text-transparent opacity-22 text-shadow-[0_4px_4px_#7b0057] sm:text-8xl md:text-[125px]`}
        >
          Hanabi
        </p>
      </div>

      <div className="absolute inset-0" aria-hidden="true">
        {FIREFLIES.map(([x, y, size, delay, duration, drift], index) => {
          const style: FireflyStyle = {
            "--x": `${x}%`,
            "--y": `${y}%`,
            "--size": `${size}px`,
            "--delay": `${delay}s`,
            "--duration": `${duration}s`,
            "--drift": `${drift}px`,
          };

          return (
            <span
              key={index}
              className="footer-firefly absolute top-[var(--y)] left-[var(--x)] size-[var(--size)] rounded-full"
              style={style}
            />
          );
        })}
      </div>
    </footer>
  );
}
*/
