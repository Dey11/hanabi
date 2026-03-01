"use client";

import Image from "next/image";
import { InlineMarquee } from "./inline-marquee";

const DESIGN_TOP_BADGES = [
  "Web Design",
  "Landing Revamp",
  "App Design",
  "Illustrations",
  "UI/UX",
  "Branding",
];

const DESIGN_PROJECTS = ["nectar", "pdx", "tuf"];

const DESIGN_TOOLS = [
  { label: "Framer", bg: "bg-black", text: "text-white", dot: "#9B8FFF" },
  { label: "Figma", bg: "bg-black", text: "text-white", dot: "#F24E1E" },
  { label: "Gemini", bg: "bg-black", text: "text-white", dot: "#4285F4" },
  {
    label: "Adobe Illustrator",
    bg: "bg-black",
    text: "text-white",
    dot: "#FF6A00",
  },
];

export function DesignCard() {
  return (
    <div
      style={{
        backgroundImage: "url('/gradients/mesh2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative flex size-[400px] flex-col overflow-hidden rounded-2xl"
    >
      <div className="pt-5">
        <InlineMarquee direction="right" duration={22}>
          <div className="flex shrink-0 gap-2 pr-2">
            {DESIGN_TOP_BADGES.map((badge) => (
              <span
                key={badge}
                className="shrink-0 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-sm font-medium text-black/70 shadow-xs inset-shadow-sm inset-shadow-white/20 backdrop-blur-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        </InlineMarquee>
      </div>

      <div className="flex flex-1 items-center overflow-hidden">
        <InlineMarquee direction="left" duration={16}>
          <div className="flex shrink-0 items-center gap-3 pr-3">
            {DESIGN_PROJECTS.map((project) => (
              <div
                key={project}
                className="shrink-0 overflow-hidden rounded-lg"
                style={{ width: 220, height: 160 }}
              >
                <Image
                  src={`/hero-projects/${project}.png`}
                  alt={project}
                  width={220}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </InlineMarquee>
      </div>

      <div>
        <InlineMarquee direction="right" duration={18}>
          <div className="flex shrink-0 gap-2 pr-2">
            {DESIGN_TOOLS.map((tool) => (
              <span
                key={tool.label}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${tool.bg} ${tool.text}`}
              >
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: tool.dot }}
                />
                {tool.label}
              </span>
            ))}
          </div>
        </InlineMarquee>
      </div>

      <div className="flex flex-col gap-2 p-5 pt-4">
        <h4 className="text-2xl font-medium">Design</h4>
        <p>
          We craft beautiful, intuitive interfaces for websites, apps, and
          digital platforms.
        </p>
      </div>
    </div>
  );
}
