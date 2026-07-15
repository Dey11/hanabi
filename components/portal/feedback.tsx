"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { submitFeedback, type FeedbackState } from "@/app/portal/actions";

/**
 * A compact feedback / testimonial capture. Clicking the trigger opens a
 * popover to leave a note + optional consent to share it publicly; the note is
 * persisted as a Testimonial.
 *
 * The popover is a self-contained overlay (no shared layoutId) so it never
 * animates on route changes, and both the form and the success state occupy the
 * same box so there's no size jump on submit.
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

  // Close on outside click + Escape.
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

  // Keep the success state visible a beat before closing.
  useEffect(() => {
    if (state.ok && open) {
      const t = setTimeout(() => setOpen(false), 4200);
      return () => clearTimeout(t);
    }
  }, [state.ok, open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setFeedback("");
          setConsent(false);
        }}
        className="border-input bg-background hover:bg-muted flex h-8 items-center rounded-lg border px-3 text-[0.8rem] font-medium shadow-xs transition-colors"
      >
        Feedback
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ type: "spring", duration: 0.26, bounce: 0 }}
            style={{ transformOrigin: "top right" }}
            className="bg-popover text-popover-foreground absolute top-0 right-0 z-50 flex min-h-[14.5rem] w-[min(20rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border shadow-lg"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {state.ok ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  className="flex flex-1 flex-col items-center justify-center gap-1 px-6 text-center"
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
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                  className="flex flex-1 flex-col p-2"
                >
                  <span className="px-1.5 pt-1 pb-1.5 text-[0.8rem] font-medium">
                    Feedback
                  </span>
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
                    className="border-input bg-background focus-visible:ring-ring/50 h-24 w-full flex-1 resize-none rounded-xl border p-3 text-[0.85rem] leading-6 outline-none focus-visible:ring-3"
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
        ) : null}
      </AnimatePresence>
    </div>
  );
}
