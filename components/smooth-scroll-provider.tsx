"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const pathname = usePathname();

  // The portal and admin are app-style, sidebar-driven surfaces — native
  // scrolling behaves better there than Lenis' document-level smoothing.
  if (pathname.startsWith("/portal") || pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
