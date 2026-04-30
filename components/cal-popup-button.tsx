"use client";

import { BOOK_A_CALL_PATH } from "@/lib/constants";
import Cal from "@calcom/embed-react";
import { useEffect, useId, useState } from "react";
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

export function CalPopupButton({
  children,
  onClick,
  ...buttonProps
}: CalPopupButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  const popup = isOpen ? (
    <div
      className="fixed inset-0 z-100 flex w-dvw max-w-dvw items-center justify-center overflow-hidden bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div className="cal-popup-embed relative h-[min(760px,calc(100dvh-2rem))] w-[calc(100dvw-1.5rem)] max-w-[calc(100dvw-1.5rem)] min-w-0 overflow-hidden sm:w-[min(1024px,calc(100dvw-3rem))] sm:max-w-[min(1024px,calc(100dvw-3rem))]">
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

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        {...buttonProps}
        type="button"
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            setIsOpen(true);
          }
        }}
      >
        {children}
      </button>

      {popup ? createPortal(popup, document.body) : null}
    </>
  );
}
