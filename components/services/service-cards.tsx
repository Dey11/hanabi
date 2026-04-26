import { DesignCard } from "./design-card";
import { DevelopmentCard } from "./development-card";
import { BrandingCard } from "./branding-card";
import { EMAIL } from "@/lib/constants";

export default function ServiceCards() {
  return (
    <div className="flex w-full flex-col items-center justify-center pt-10">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <DevelopmentCard />
        <DesignCard />
        <BrandingCard />
      </div>

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
    </div>
  );
}
