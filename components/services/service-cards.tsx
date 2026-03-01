import { DesignCard } from "./design-card";
import { DevelopmentCard } from "./development-card";
import { BrandingCard } from "./branding-card";

export default function ServiceCards() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 pt-10">
      <DevelopmentCard />
      <DesignCard />
      <BrandingCard />
    </div>
  );
}
