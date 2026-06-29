"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function SuccessModal({ open, onClose }: SuccessModalProps) {
  const { t } = useLanguage();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-default"
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
            aria-describedby="success-modal-body"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[rgba(239,238,234,0.1)] bg-[rgba(239,238,234,0.05)] backdrop-blur-[28px] px-8 py-10 text-center shadow-[0_0_120px_rgba(0,0,254,0.25)]"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 24 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            {/* Atmospheric glow blobs */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-20 h-56 w-56 rounded-full bg-accent-light/30 blur-[90px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-28 -right-16 h-56 w-56 rounded-full bg-accent-alt/20 blur-[90px]"
            />

            {/* Close (X) */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label={t.newsletter.modal.close}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative flex flex-col items-center gap-5">
              {/* Success badge */}
              <motion.div
                className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-success/30 to-accent-alt/10 ring-1 ring-success/40"
                initial={reduceMotion ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.12 }}
              >
                <span className="absolute inset-0 animate-glow-pulse rounded-full" aria-hidden />
                <Check className="h-9 w-9 text-success" strokeWidth={2.5} />
              </motion.div>

              <h2
                id="success-modal-title"
                className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight text-white"
              >
                {t.newsletter.modal.title}
              </h2>

              <p
                id="success-modal-body"
                className="text-[15px] leading-relaxed text-text-secondary"
              >
                {t.newsletter.modal.body}
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-2 h-12 w-full rounded-full bg-accent font-bold text-text-primary transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
              >
                {t.newsletter.modal.close}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
