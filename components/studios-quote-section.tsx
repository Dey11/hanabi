import { Reveal } from "@/components/reveal";
import { Sawarabi_Gothic } from "next/font/google";
import Image from "next/image";

const sawarabiGothic = Sawarabi_Gothic({
  subsets: ["latin"],
  weight: ["400"],
});

export default function StudiosQuoteSection() {
  return (
    <section
      id="studios"
      className="relative overflow-hidden bg-[#F6F6F6] px-5 pt-10 pb-24 text-center sm:pt-14 sm:pb-28"
    >
      <Reveal>
        <h3 className="font-mono text-lg font-medium text-[#6C6C6C] uppercase sm:text-xl">
          Who We Are
        </h3>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="pt-4 text-center text-4xl leading-tight font-medium md:text-4xl">
          The People Behind the Pixels.
        </h2>
      </Reveal>

      <Reveal
        delay={0.12}
        className="relative z-10 mx-auto mt-10 w-full max-w-6xl"
      >
        <div className="@container relative mx-auto min-h-[245px] w-full max-w-4xl sm:min-h-[320px] md:min-h-[370px]">
          <p
            className={`${sawarabiGothic.className} pointer-events-none absolute top-0 right-0 left-0 z-0 text-center text-[clamp(3.2rem,16cqw,8.75rem)] leading-[1.05] font-medium tracking-tighter whitespace-nowrap text-black`}
            aria-hidden="true"
          >
            Hanabi Studios
          </p>

          <div className="gradient-border-4 gradient-border-from-[#FF6B52] gradient-border-to-[#FFC874] animate-gradient-border motion-reduce:animate-none [--gradient-border-duration:9s] absolute top-11 right-0 left-0 z-10 h-[180px] rounded-xl bg-[#F6F6F6] sm:top-18 sm:h-[230px] sm:rounded-2xl md:top-23 md:h-[260px]">
            <div className="absolute inset-0 grid place-items-center px-6 sm:px-10">
              <blockquote
                className={`max-w-[46ch] text-center font-sans text-[15px] leading-relaxed tracking-tight text-black sm:text-base md:text-3xl`}
              >
                “We don’t chase complexity - we craft clarity. Every pixel is
                intentional, every interaction earned.”
              </blockquote>
            </div>
            <Image
              src="/logo-dark.svg"
              alt=""
              width={168}
              height={135}
              className="absolute bottom-4 left-4 h-8 w-auto sm:bottom-6 sm:left-6 sm:h-10"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
