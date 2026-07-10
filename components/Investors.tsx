"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Investors() {
  const { t } = useLanguage();

  return (
    <section id="investors" className="relative py-24 md:py-32 px-6">
      {/* Ambient growth-green glow, distinct from the newsletter's blue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[min(680px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,254,0.16),rgba(140,82,255,0.07)_45%,transparent_70%)] blur-[40px]"
      />

      {/* Hairline that separates this CTA from the newsletter above */}
      <div
        aria-hidden="true"
        className="mx-auto mb-16 h-px w-24 bg-gradient-to-r from-transparent via-accent-glow/40 to-transparent"
      />

      <div className="mx-auto max-w-2xl text-center">
        <motion.span
          className="inline-flex items-center gap-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-accent-glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <span aria-hidden="true" className="h-px w-6 bg-accent-glow/50" />
          {t.investors.eyebrow}
          <span aria-hidden="true" className="h-px w-6 bg-accent-glow/50" />
        </motion.span>

        <motion.h2
          className="mt-6 font-[family-name:var(--font-display-wide)] text-3xl font-bold uppercase leading-[1.05] text-white md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          {t.investors.heading}
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {t.investors.description}
        </motion.p>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          {/* Signature: the deck download reads like the document it delivers */}
          <a
            href="/deck/shine-deck.pdf"
            download="Shine-Deck.pdf"
            aria-label={t.investors.ctaAria}
            className="group inline-flex items-center gap-4 rounded-2xl border border-[rgba(0,0,254,0.25)] bg-[rgba(0,0,254,0.04)] px-6 py-4 backdrop-blur-[20px] shadow-[0_0_60px_rgba(0,0,254,0.12)] transition-all duration-300 hover:scale-[1.02] hover:border-[rgba(0,0,254,0.5)] hover:bg-[rgba(0,0,254,0.08)] hover:shadow-[0_0_90px_rgba(0,0,254,0.22)] active:scale-[0.99]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,0,254,0.12)] text-accent-glow transition-colors duration-300 group-hover:bg-[rgba(0,0,254,0.18)]">
              <FileText className="h-5 w-5" />
            </span>

            <span className="flex flex-col items-start text-left">
              <span className="font-[family-name:var(--font-display-wide)] text-sm font-bold uppercase tracking-wide text-white">
                {t.investors.cta}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-xs text-text-secondary">
                {t.investors.ctaMeta}
              </span>
            </span>

            <Download className="ml-1 h-5 w-5 shrink-0 text-accent-glow transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
