"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/footer";

export default function FooterReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const update = () => setFooterHeight(el.getBoundingClientRect().height);
    update();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(update);
      ro.observe(el);
      return () => ro.disconnect();
    }

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <div
        className="relative z-10 bg-white"
        style={{ marginBottom: footerHeight }}
      >
        {children}
      </div>

      <div
        ref={footerRef}
        className="fixed inset-x-0 bottom-0 z-0"
        aria-hidden={footerHeight === 0}
      >
        <Footer />
      </div>
    </>
  );
}
