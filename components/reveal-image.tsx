"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { blurPlaceholders } from "@/lib/blur-placeholders";

type RevealImageProps = ImageProps & {
  wrapperClassName?: string;
};

/**
 * Reveals an image with a "blurry → sharp" focus effect, but WITHOUT animating
 * `filter: blur()` on the full-size image (which re-rasterizes every frame and
 * causes scroll jank). Instead a tiny pre-blurred bitmap sits underneath and the
 * sharp image cross-fades in over it — only `opacity` animates, which stays on
 * the compositor. Falls back to a plain image when no placeholder exists, and to
 * an instant (non-animated) swap under `prefers-reduced-motion`.
 */
export default function RevealImage({
  wrapperClassName,
  onLoad,
  quality,
  decoding,
  className,
  ...props
}: RevealImageProps) {
  const [loaded, setLoaded] = useState(false);

  const blurDataURL =
    typeof props.src === "string" ? blurPlaceholders[props.src] : undefined;

  const fadeBase = "transition-opacity duration-700 ease-out";

  return (
    <div className={wrapperClassName}>
      {blurDataURL && (
        // eslint-disable-next-line @next/next/no-img-element -- tiny inline data-URL LQIP, not an optimizable asset
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""} ${fadeBase} motion-reduce:transition-none ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
      <Image
        {...props}
        className={`${className ?? ""} ${
          blurDataURL
            ? `${fadeBase} motion-reduce:transition-none ${loaded ? "opacity-100" : "opacity-0"}`
            : ""
        }`}
        quality={quality ?? 82}
        decoding={decoding ?? "async"}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </div>
  );
}
