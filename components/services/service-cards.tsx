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

export default function ServiceCards() {
  return (
    <div className="flex w-full flex-col items-center justify-center pt-10">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <Reveal delay={0}>
          <DevelopmentCard />
        </Reveal>
        <Reveal delay={0.06}>
          <DesignCard />
        </Reveal>
        <Reveal delay={0.12}>
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

      <div className="my-20 flex flex-row items-center justify-between gap-40">
        <Reveal delay={0}>
          <div className="flex h-[250px] w-[450px] -rotate-8 flex-col overflow-hidden rounded-lg border-4 border-dashed border-[#FF6600] bg-black">
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
          <div className="flex h-[250px] w-[450px] rotate-8 flex-col overflow-hidden rounded-lg border-4 border-dashed border-[#FF6600] bg-black">
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
