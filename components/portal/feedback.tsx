"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { submitFeedback, type FeedbackState } from "@/app/portal/actions";

/**
 * A compact feedback / testimonial capture. The trigger morphs into a popover
 * (shared layoutId), collects a note + optional consent to share it publicly,
 * and persists it as a Testimonial. Adapted to Hanabi's tokens.
 */
export function Feedback() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, action, pending] = useActionState<FeedbackState, FormData>(
    submitFeedback,
    {},
  );
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click + Escape; submit on Cmd/Ctrl+Enter.
  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Auto-close shortly after a successful submit.
  useEffect(() => {
    if (state.ok && open) {
      const t = setTimeout(() => setOpen(false), 2200);
      return () => clearTimeout(t);
    }
  }, [state.ok, open]);

  return (
    <div className="relative">
      {!open ? (
        <motion.button
          layoutId="feedback-wrapper"
          onClick={() => {
            setOpen(true);
            setFeedback("");
            setConsent(false);
          }}
          className="border-input bg-background hover:bg-muted flex h-8 items-center rounded-lg border px-3 text-[0.8rem] font-medium shadow-xs transition-colors"
          style={{ borderRadius: 10 }}
        >
          <motion.span layoutId="feedback-title">Feedback</motion.span>
        </motion.button>
      ) : (
        <motion.div
          layoutId="feedback-wrapper"
          ref={ref}
          style={{ borderRadius: 16 }}
          className="bg-popover text-popover-foreground absolute top-0 right-0 z-50 w-[min(20rem,calc(100vw-2rem))] overflow-hidden border shadow-lg"
        >
          <AnimatePresence mode="popLayout">
            {state.ok ? (
              <motion.div
                key="success"
                initial={{ y: -24, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                className="flex flex-col items-center gap-1 px-6 py-8 text-center"
              >
                <span className="grid size-9 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
                  <Check className="size-5" />
                </span>
                <h3 className="mt-2 text-sm font-semibold">
                  Feedback received
                </h3>
                <p className="text-muted-foreground text-[0.8rem]">
                  Thank you — it means a lot to the team.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                action={action}
                exit={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                className="p-2"
              >
                <div className="flex items-center justify-between px-1.5 pt-1 pb-1.5">
                  <motion.span
                    layoutId="feedback-title"
                    className="text-[0.8rem] font-medium"
                  >
                    Feedback
                  </motion.span>
                </div>
                <input
                  type="hidden"
                  name="consent"
                  value={consent ? "true" : "false"}
                />
                <textarea
                  autoFocus
                  name="body"
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="How's the project going? Anything you'd tell others about working with us?"
                  className="border-input bg-background focus-visible:ring-ring/50 h-28 w-full resize-none rounded-xl border p-3 text-[0.85rem] leading-6 outline-none focus-visible:ring-3"
                />
                <label className="text-muted-foreground mt-2 flex items-center gap-2 px-1 text-[0.75rem]">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="accent-foreground size-3.5"
                  />
                  Hanabi may share this as a testimonial
                </label>

                {state.error ? (
                  <p className="text-destructive mt-2 px-1 text-[0.75rem]">
                    {state.error}
                  </p>
                ) : null}

                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={pending}
                    className="bg-primary text-primary-foreground hover:bg-primary/85 inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[0.8rem] font-medium transition-colors disabled:opacity-60"
                  >
                    {pending ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      "Send feedback"
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
