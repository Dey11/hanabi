import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Hanabi mark. Used on portal/admin login and chrome in place of a
 * letter-spaced wordmark.
 */
export function BrandLogo({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/logo.svg"
      alt="Hanabi"
      width={size}
      height={size}
      priority
      className={cn("rounded-[22%]", className)}
    />
  );
}
