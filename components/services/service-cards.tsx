import { DesignCard } from "./design-card";
import { DevelopmentCard } from "./development-card";
import { BrandingCard } from "./branding-card";
import { EMAIL } from "@/lib/constants";
import { Reveal } from "@/components/reveal";
import { Sawarabi_Gothic } from "next/font/google";

const sawarabiGothic = Sawarabi_Gothic({
  subsets: ["latin"],
  weight: ["400"],
});

export default function ServiceCards({
  heroProjects,
}: {
  heroProjects: string[];
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center pt-10">
      <div className="grid w-full max-w-6xl grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal delay={0}>
          <DevelopmentCard />
        </Reveal>
        <Reveal delay={0.06}>
          <DesignCard projects={heroProjects} />
        </Reveal>
        <Reveal delay={0.12} className="sm:col-span-2 lg:col-span-1">
          <BrandingCard />
        </Reveal>
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

      <div className="my-16 flex w-full max-w-6xl flex-col items-center justify-center gap-10 px-4 md:my-20 md:flex-row md:justify-between md:gap-14 md:px-0">
        <Reveal delay={0}>
          <div className="flex h-[240px] w-full -rotate-3 flex-col overflow-hidden rounded-lg border-4 border-dashed border-[#FF6600] bg-black md:h-[250px] md:w-[450px] md:-rotate-8">
            <div className="flex h-full w-full flex-col rounded-[7px] bg-white px-4 py-3 shadow-[inset_0_0_10px_rgba(0,0,0)]">
              <div className="flex-1" />
              <div className="flex items-center justify-between">
                <div className={sawarabiGothic.className}>JJ Joson</div>
                <div className={sawarabiGothic.className}>JJ</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="flex h-[240px] w-full rotate-3 flex-col overflow-hidden rounded-lg border-4 border-dashed border-[#FF6600] bg-black md:h-[250px] md:w-[450px] md:rotate-8">
            <div className="flex h-full w-full flex-col rounded-[7px] bg-black px-4 py-3 shadow-[inset_0_0_10px_rgba(0,0,0)]">
              <div className="flex-1" />
              <div className="flex items-center justify-between text-white">
                <div className={sawarabiGothic.className}>JJ Joson</div>
                <div className={sawarabiGothic.className}>JJ</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
