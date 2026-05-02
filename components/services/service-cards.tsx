import { DesignCard } from "./design-card";
import { DevelopmentCard } from "./development-card";
import { BrandingCard } from "./branding-card";
import { EMAIL } from "@/lib/constants";
import { Reveal } from "@/components/reveal";
import Image from "next/image";
import { Sawarabi_Gothic } from "next/font/google";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sawarabiGothic = Sawarabi_Gothic({
  subsets: ["latin"],
  weight: ["400"],
});

type ExtraService = {
  label: string;
  muted?: boolean;
};

const EXTRA_SERVICES: ExtraService[] = [
  { label: "AI Automation" },
  { label: "Telegram Bots" },
  { label: "Discord Bots" },
  { label: "Frontend Revamp" },
  { label: "Design Systems" },
  { label: "And more...", muted: true },
];

function TestimonialBrandLogo({ invert = false }: { invert?: boolean }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          type="button"
          aria-label="About Hanabi"
          className="group/logo relative grid h-9 w-9 cursor-default place-items-center rounded-md transition-transform duration-150 ease-out hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-[#FF6600]/40 focus-visible:outline-none"
        >
          <Image
            src="/logo-dark.svg"
            alt=""
            width={168}
            height={135}
            className={[
              "h-6 w-7 object-contain transition-[filter,opacity] duration-200 ease-out",
              invert
                ? "brightness-0 invert group-hover/logo:filter-none"
                : "brightness-0 group-hover/logo:filter-none",
            ].join(" ")}
          />
        </TooltipTrigger>
        <TooltipContent side="bottom" className="w-72 p-0">
          <div className="flex items-center justify-between gap-4 px-3 py-2.5">
            <div className="text-sm font-semibold text-black">Hanabi</div>
            <div className="text-xs font-medium text-[#7A7A7A]">
              Design & Development
            </div>
          </div>
          <div className="h-px w-full bg-black/10" />
          <p className="px-3 py-2.5 text-sm leading-snug text-[#3F3F3F]">
            We craft simple, beautiful digital experiences with a careful eye
            for detail.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function ServiceCards({
  heroProjects,
}: {
  heroProjects: string[];
}) {
  return (
    <div className="mb-16 flex w-full flex-col items-center justify-center pt-10">
      <div className="flex w-full max-w-[1248px] flex-wrap justify-center gap-6">
        <Reveal delay={0} className="w-full max-w-[400px]">
          <DevelopmentCard />
        </Reveal>
        <Reveal delay={0.06} className="w-full max-w-[400px]">
          <DesignCard projects={heroProjects} />
        </Reveal>
        <Reveal delay={0.12} className="w-full max-w-[400px]">
          <BrandingCard />
        </Reveal>
      </div>

      <div className="mt-8 grid w-full max-w-[1248px] grid-cols-2 gap-3 px-0 sm:grid-cols-3 md:grid-cols-6">
        {EXTRA_SERVICES.map((service, idx) => {
          return (
            <Reveal
              key={service.label}
              delay={Math.min(0.02 * idx, 0.14)}
              className="min-w-0"
            >
              <div
                className={[
                  "relative flex h-11 items-center justify-center rounded-xl px-4 text-center",
                  service.muted
                    ? ""
                    : "border border-black/8 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-10px_rgba(0,0,0,0.28),0_1px_0_rgba(255,255,255,0.92)_inset]",
                  service.muted ? "text-[#8A8A8A]" : "text-foreground",
                ].join(" ")}
              >
                {!service.muted ? (
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-linear-to-b from-white via-white/50 to-transparent opacity-70"
                    aria-hidden
                  />
                ) : null}
                <span className="relative max-w-full text-sm leading-tight font-medium text-pretty">
                  {service.label}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.06}>
        <p className="mt-10 max-w-2xl text-center text-base font-medium text-[#6C6C6C]">
          Need a tailored solution for your needs? <br />
          Mail us at{" "}
          <a className="text-foreground" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>{" "}
          for a{" "}
          <span className="bg-linear-to-b from-[#FF2500] to-[#FF9900] bg-clip-text text-transparent italic">
            same-day response.
          </span>
        </p>
      </Reveal>

      {false ? (
        <div className="my-16 flex w-full max-w-6xl flex-col items-center justify-center gap-10 px-4 md:my-20 md:flex-row md:justify-between md:gap-14 md:px-0">
          <Reveal delay={0}>
            <div className="flex h-[240px] w-full max-w-[450px] -rotate-3 flex-col overflow-hidden rounded-lg border-4 border-dashed border-[#FF6600] bg-black md:h-[250px] md:w-[450px] md:-rotate-8">
              <div className="flex h-full w-full flex-col rounded-[7px] bg-white px-4 py-3 shadow-[inset_0_0_10px_rgba(0,0,0)]">
                <p className="max-w-sm pt-2 text-xl leading-tight font-medium text-pretty text-black">
                  "Hanabi took a loose idea and turned it into a polished site
                  that felt clear, fast, and genuinely easy to launch."
                </p>
                <div className="flex-1" />
                <div className="flex items-center justify-between">
                  <div className={sawarabiGothic.className}>JJ Joson</div>
                  <TestimonialBrandLogo />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex h-[240px] w-full max-w-[450px] rotate-3 flex-col overflow-hidden rounded-lg border-4 border-dashed border-[#FF6600] bg-black md:h-[250px] md:w-[450px] md:rotate-8">
              <div className="flex h-full w-full flex-col rounded-[7px] bg-black px-4 py-3 shadow-[inset_0_0_10px_rgba(0,0,0)]">
                <p className="max-w-sm pt-2 text-xl leading-tight font-medium text-pretty text-white">
                  "The process was smooth from start to finish. Every page came
                  together with the kind of detail we hoped for."
                </p>
                <div className="flex-1" />
                <div className="flex items-center justify-between text-white">
                  <div className={sawarabiGothic.className}>JJ Joson</div>
                  <TestimonialBrandLogo invert />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      ) : null}
    </div>
  );
}
