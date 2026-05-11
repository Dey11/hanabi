"use client";

import { BOOK_A_CALL_PATH } from "@/lib/constants";
import Cal from "@calcom/embed-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const CAL_MODAL_CONFIG = {
  layout: "month_view",
  iframeAttrs: {
    style:
      "display:block;width:100%;max-width:100%;min-width:0;border:0;overflow:hidden;",
  },
} as const;

type CalPopupButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "type"
> & {
  children: ReactNode;
};

export function useCalPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const embedRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

  const popup = isOpen ? (
    <div
      className="fixed inset-0 z-100 flex w-dvw max-w-dvw items-center justify-center overflow-hidden p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close booking popup"
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <button
        type="button"
        aria-label="Close booking popup"
        className="fixed top-4 right-4 z-[2147483647] flex size-10 items-center justify-center bg-transparent text-4xl leading-none font-medium text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] transition-transform duration-75 hover:scale-105 active:scale-95 sm:top-6 sm:right-6"
        onClick={() => setIsOpen(false)}
      >
        ×
      </button>
      <div
        ref={embedRef}
        className="cal-popup-embed relative z-10 h-[min(760px,calc(100dvh-2rem))] w-[calc(100dvw-1.5rem)] max-w-[calc(100dvw-1.5rem)] min-w-0 overflow-hidden sm:w-[min(1024px,calc(100dvw-3rem))] sm:max-w-[min(1024px,calc(100dvw-3rem))]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="sr-only">
          Book an intro call
        </h2>
        <Cal
          calLink={BOOK_A_CALL_PATH}
          calOrigin="https://app.cal.com"
          config={CAL_MODAL_CONFIG}
          style={{
            height: "100%",
            maxWidth: "100%",
            overflow: "hidden",
            width: "100%",
          }}
        />
      </div>
    </div>
  ) : null;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    const handleOutsidePointerDown = (event: PointerEvent) => {
      const embed = embedRef.current;

      if (embed && !embed.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleOutsidePointerDown, {
      capture: true,
    });

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleOutsidePointerDown, {
        capture: true,
      });
    };
  }, [isOpen]);

  return {
    openPopup: () => setIsOpen(true),
    popup: popup ? createPortal(popup, document.body) : null,
  };
}

export function CalPopupButton({
  children,
  onClick,
  ...buttonProps
}: CalPopupButtonProps) {
  const { openPopup, popup } = useCalPopup();

  return (
    <>
      <button
        {...buttonProps}
        type="button"
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            openPopup();
          }
        }}
      >
        {children}
      </button>

      {popup}
    </>
  );
}
