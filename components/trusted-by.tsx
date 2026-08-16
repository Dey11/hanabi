"use client";

import Image from "next/image";

import { SeamlessMarquee } from "@/components/seamless-marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Client = {
  name: string;
  logo: {
    src: string;
    width: number;
    height: number;
    monoClass?: string;
    /** White source artwork is rendered as a mask so it can reveal its brand color. */
    treatment?: "mask";
  };
  glow: string;
  testimonial: string;
  person: string;
  role: string;
  featured?: boolean;
};

// Add a client here to include it in both the marquee and its hover testimonial.
const CLIENTS: Client[] = [
  {
    name: "Thomas Bewick",
    logo: {
      src: "/client-logos/thomas-bewick.webp",
      width: 128,
      height: 98,
      monoClass: "opacity-45 brightness-0 grayscale",
    },
    glow: "rgba(133, 62, 30, 0.18)",
    testimonial:
      "Hanabi brought clarity to every decision and gave us a digital home that feels distinctly ours.",
    person: "Emily Carter",
    role: "Founder, Thomas Bewick",
  },
  {
    name: "Down the Cove",
    logo: {
      src: "/client-logos/down-the-cove.png",
      width: 801,
      height: 439,
      treatment: "mask",
    },
    glow: "rgba(0, 86, 178, 0.18)",
    testimonial:
      "Thoughtful, responsive, and a pleasure to work with. The finished experience is beautifully considered.",
    person: "Liam Hayes",
    role: "Co-founder, Down the Cove",
  },
  {
    name: "CompOps",
    logo: {
      src: "/client-logos/compops.png",
      width: 900,
      height: 756,
      monoClass: "opacity-45 brightness-0 grayscale",
    },
    glow: "rgba(238, 50, 72, 0.17)",
    testimonial:
      "The team made a complex product feel exceptionally simple. We could not be happier with the result.",
    person: "Maya Patel",
    role: "Product Lead, CompOps",
  },
  {
    name: "Ballarat Box Sports",
    logo: {
      src: "/client-logos/ballarat-box-sports.png",
      width: 575,
      height: 800,
      monoClass: "opacity-45 brightness-0 grayscale",
    },
    glow: "rgba(54, 198, 120, 0.18)",
    testimonial:
      "They understood our energy from day one, then translated it into a site our community loves using.",
    person: "Jordan Lee",
    role: "Director, Ballarat Box Sports",
  },
  {
    name: "2X Sales",
    logo: {
      src: "/client-logos/2x-sales.png",
      width: 664,
      height: 144,
      monoClass: "opacity-45 brightness-0 grayscale",
    },
    glow: "rgba(0, 86, 178, 0.18)",
    testimonial:
      "The new experience gave our team a confident, focused way to tell the story behind what we do.",
    person: "Taylor Reed",
    role: "Co-founder, 2X Sales",
    featured: true,
  },
  {
    name: "Stealth",
    logo: {
      src: "/client-logos/stealth.png",
      width: 798,
      height: 798,
      monoClass: "opacity-80 brightness-75 contrast-30 grayscale",
    },
    glow: "rgba(87, 93, 110, 0.2)",
    testimonial:
      "A thoughtful partner from the first sketch through to the details that made the finished work feel complete.",
    person: "Casey Morgan",
    role: "Founder, Stealth",
  },
  {
    name: "Moai",
    logo: {
      src: "/client-logos/moai.png",
      width: 882,
      height: 1280,
      monoClass: "opacity-80 brightness-75 contrast-30 grayscale",
    },
    glow: "rgba(255, 187, 0, 0.2)",
    testimonial:
      "They made the complex feel effortless and gave us a brand experience people actually remember.",
    person: "Jamie Park",
    role: "Product Lead, Moai",
    featured: true,
  },
];

function ClientLogo({ client }: { client: Client }) {
  if (client.logo.treatment === "mask") {
    return (
      <span className="relative z-10 h-14 w-full max-w-[10rem] sm:h-16">
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[#0056B2] opacity-0 transition-[opacity,scale] duration-200 ease-out group-hover:scale-105 group-hover:opacity-100 group-focus-visible:scale-105 group-focus-visible:opacity-100"
          style={{
            mask: `url(${client.logo.src}) center / contain no-repeat`,
            WebkitMask: `url(${client.logo.src}) center / contain no-repeat`,
          }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-black/45 transition-opacity duration-200 ease-out group-hover:opacity-0 group-focus-visible:opacity-0"
          style={{
            mask: `url(${client.logo.src}) center / contain no-repeat`,
            WebkitMask: `url(${client.logo.src}) center / contain no-repeat`,
          }}
        />
      </span>
    );
  }

  return (
    <span className="relative z-10 h-14 w-full max-w-[10rem] sm:h-16">
      <Image
        src={client.logo.src}
        alt={client.name}
        width={client.logo.width}
        height={client.logo.height}
        sizes="200px"
        className="absolute inset-0 h-full w-full object-contain opacity-0 transition-[opacity,scale] duration-200 ease-out group-hover:scale-105 group-hover:opacity-100 group-focus-visible:scale-105 group-focus-visible:opacity-100"
      />
      <Image
        src={client.logo.src}
        alt=""
        aria-hidden="true"
        width={client.logo.width}
        height={client.logo.height}
        sizes="200px"
        className={`pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ease-out group-hover:opacity-0 group-focus-visible:opacity-0 ${client.logo.monoClass}`}
      />
    </span>
  );
}

function MarqueeClient({ client }: { client: Client }) {
  return (
    <Tooltip>
      <TooltipTrigger
        className="group relative isolate flex h-28 w-48 shrink-0 cursor-default items-center justify-center px-5 outline-none focus-visible:ring-2 focus-visible:ring-black/15 sm:h-30 sm:w-56"
        aria-label={`Read ${client.name} testimonial`}
      >
        <span
          className="pointer-events-none absolute top-1/2 left-1/2 h-24 w-52 -translate-x-1/2 -translate-y-1/2 scale-25 rounded-[50%] opacity-0 transition-[opacity,scale] duration-500 ease-out group-hover:scale-110 group-hover:opacity-100 group-focus-visible:scale-110 group-focus-visible:opacity-100"
          style={{
            background: `radial-gradient(ellipse at center, ${client.glow} 0%, transparent 72%)`,
          }}
          aria-hidden="true"
        />
        <ClientLogo client={client} />
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={12}
        className="w-[min(20rem,calc(100vw-2rem))] rounded-xl border-black/10 bg-white p-4 text-left shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45),0_1px_0_rgba(255,255,255,0.95)_inset]"
      >
        <p className="text-sm leading-snug font-medium tracking-[-0.02em] text-[#252525]">
          <span className="mr-0.5 font-serif text-xl leading-none text-[#FF5A1F]">
            “
          </span>
          {client.testimonial}
        </p>
        <div className="mt-3 border-t border-black/8 pt-2.5">
          <p className="text-sm font-medium text-black">{client.person}</p>
          <p className="mt-0.5 text-xs font-medium text-[#777]">
            {client.role}
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function StitchedTestimonial({
  client,
  dark,
}: {
  client: Client;
  dark: boolean;
}) {
  return (
    <article className="group relative min-h-[19rem] rounded-[1.55rem] bg-[#151515] p-[4px] shadow-[0_18px_34px_-24px_rgba(0,0,0,0.42),0_2px_0_rgba(255,255,255,0.75)_inset] transition-transform duration-300 ease-out hover:-translate-y-1 sm:min-h-[20rem]">
      <span
        className="pointer-events-none absolute inset-[2px] rounded-[1.42rem] border-2 border-dashed border-[#FF6600]"
        aria-hidden="true"
      />
      <div
        className={[
          "relative flex min-h-[19rem] flex-col rounded-[1.28rem] border p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-12px_20px_rgba(0,0,0,0.1)] sm:min-h-[20rem] sm:p-7",
          dark
            ? "border-white/8 bg-[#171717] text-white"
            : "border-black/8 bg-white text-[#161616]",
        ].join(" ")}
      >
        <Image
          src="/logo-dark.svg"
          alt=""
          width={168}
          height={135}
          className={[
            "h-7 w-auto object-contain",
            dark ? "brightness-0 invert" : "brightness-0",
          ].join(" ")}
          aria-hidden="true"
        />

        <blockquote className="mt-7 max-w-[28ch] text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.08] font-medium tracking-[-0.045em] text-balance">
          “{client.testimonial}”
        </blockquote>

        <footer className="mt-auto pt-6">
          <p className="text-base font-medium tracking-[-0.035em]">
            {client.person}
          </p>
          <p
            className={[
              "mt-1 text-xs font-medium",
              dark ? "text-white/55" : "text-[#777]",
            ].join(" ")}
          >
            {client.role}
          </p>
        </footer>
      </div>
    </article>
  );
}

export default function TrustedBy() {
  const featuredClients = CLIENTS.filter((client) => client.featured);

  return (
    <section
      aria-labelledby="trusted-by-heading"
      className="relative overflow-hidden bg-[#F6F6F6] pt-4 pb-16 sm:pt-6 sm:pb-20"
    >
      <div className="mx-auto flex max-w-[1248px] flex-col items-center px-5 text-center">
        <p className="font-mono text-xs font-medium tracking-[0.1em] text-[#777] uppercase sm:text-sm">
          In good company
        </p>
        <h2
          id="trusted-by-heading"
          className="mt-2 max-w-xl text-center text-2xl leading-[1.1] font-medium tracking-[-0.04em] text-balance sm:text-3xl"
        >
          Trusted by people building with intent.
        </h2>
      </div>

      <TooltipProvider delay={120} closeDelay={80}>
        <div className="relative mt-7 py-2 sm:mt-9">
          <span
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-[#F6F6F6] to-transparent sm:w-24"
            aria-hidden="true"
          />
          <SeamlessMarquee speed={28} className="py-2" pauseOnHover>
            <div className="flex shrink-0 items-center gap-5 pr-5 sm:gap-8 sm:pr-8">
              {CLIENTS.map((client) => (
                <MarqueeClient key={client.name} client={client} />
              ))}
            </div>
          </SeamlessMarquee>
          <span
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-[#F6F6F6] to-transparent sm:w-24"
            aria-hidden="true"
          />
        </div>
      </TooltipProvider>

      <div className="mx-auto mt-10 grid max-w-[1180px] gap-5 px-5 md:mt-14 md:grid-cols-2 md:gap-6">
        {featuredClients.map((client, index) => (
          <StitchedTestimonial
            key={client.name}
            client={client}
            dark={index === 1}
          />
        ))}
      </div>
    </section>
  );
}
