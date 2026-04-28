"use client";

import { motion } from "motion/react";
import Image, { type ImageProps } from "next/image";
import { useMemo, useState } from "react";

type RevealImageProps = ImageProps & {
  wrapperClassName?: string;
};

export default function RevealImage({
  wrapperClassName,
  onLoad,
  ...props
}: RevealImageProps) {
  const [loaded, setLoaded] = useState(false);

  const transition = useMemo(
    () => ({ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }),
    [],
  );

  return (
    <motion.div
      className={wrapperClassName}
      initial={{ opacity: 0, filter: "blur(16px)" }}
      animate={loaded ? { opacity: 1, filter: "blur(0px)" } : undefined}
      transition={transition}
      style={{ willChange: "opacity, filter" }}
    >
      <Image
        {...props}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </motion.div>
  );
}
