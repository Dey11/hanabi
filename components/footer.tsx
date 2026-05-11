import type { CSSProperties } from "react";
import FooterLiquidGlassButton from "@/components/footer-liquid-glass-button";
import TransitionFireworksCanvas from "@/components/transition-fireworks-canvas";
import { Sawarabi_Gothic } from "next/font/google";
import { EMAIL, INSTAGRAM, LINKEDIN, TELEGRAM } from "@/lib/constants";
import { siInstagram, siTelegram, type SimpleIcon } from "simple-icons";

const sawarabiGothic = Sawarabi_Gothic({
  weight: "400",
  subsets: ["latin"],
});

const FOOTER_IMAGE = "/footer.png";
const SHOW_FOOTER_TRANSITION_SECTION = false;

const SOCIAL_LINKS = [
  { label: "Email", href: `mailto:${EMAIL}`, icon: "mail" },
  { label: "Instagram", href: INSTAGRAM, icon: siInstagram },
  { label: "LinkedIn", href: LINKEDIN, icon: "linkedin" },
  { label: "Telegram", href: TELEGRAM, icon: siTelegram },
] as const;

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

function SocialIcon({
  icon,
  label,
}: {
  icon: SimpleIcon | "linkedin" | "mail";
  label: string;
}) {
  if (icon === "mail") {
    return (
      <img
        src="/icons/mail.svg"
        alt=""
        className="h-5 w-5 opacity-90"
        aria-hidden="true"
      />
    );
  }

  if (icon === "linkedin") {
    return (
      <img
        src="/icons/linkedin.svg"
        alt=""
        className="h-5 w-5 opacity-90"
        aria-hidden="true"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={label === "Instagram" ? "size-5" : "size-4"}
      aria-hidden="true"
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

export default function Footer({ isActive = false }: { isActive?: boolean }) {
  return (
    <div
      id="footer"
      className="relative w-full overflow-hidden bg-black text-white"
    >
      {SHOW_FOOTER_TRANSITION_SECTION ? (
        <section
          className="relative h-[260px] overflow-hidden bg-black sm:h-[340px] lg:h-[410px]"
          aria-label="Footer artwork"
        >
          <img
            src="/footer-transition.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-96"
            draggable={false}
          />
          <div className="absolute inset-0 z-10" aria-hidden="true">
            <TransitionFireworksCanvas active={isActive} />
          </div>
          <div className="absolute inset-x-0 bottom-[10%] z-40 flex justify-center px-5">
            <div className="flex max-w-[calc(100vw-2rem)] flex-col items-center justify-center gap-4 px-2 py-2 sm:gap-5">
              <FooterLiquidGlassButton />
              <p className="max-w-[39ch] text-center text-sm leading-snug font-medium text-white/84 sm:text-base">
                The agency for building standout scalable digital experiences
              </p>
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-32 bg-linear-to-b from-transparent via-black/66 to-black sm:h-44"
            aria-hidden="true"
          />
        </section>
      ) : null}

      <footer className="relative h-[460px] w-full overflow-hidden bg-black text-white sm:h-[520px]">
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
            className={`${sawarabiGothic.className} bg-linear-to-b from-[#ff49ca] to-[#ff8cdf] bg-clip-text text-6xl leading-none tracking-normal text-transparent opacity-34 text-shadow-[0_4px_8px_rgba(123,0,87,0.72)] sm:text-8xl md:text-[125px]`}
          >
            Hanabi
          </p>
        </div>

        <nav
          className="absolute inset-x-0 bottom-8 z-20 flex justify-center gap-3 sm:bottom-10 sm:gap-4"
          aria-label="Social links"
        >
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="grid size-7 place-items-center text-white/45 transition-[color,transform] duration-200 hover:text-white/80 sm:size-8"
            >
              <SocialIcon icon={social.icon} label={social.label} />
            </a>
          ))}
        </nav>

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
    </div>
  );
}
