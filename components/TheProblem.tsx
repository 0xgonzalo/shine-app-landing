"use client";

import { motion } from "framer-motion";
import StatCard from "./StatCard";
import { useLanguage } from "@/lib/i18n";

export default function TheProblem() {
  const { t } = useLanguage();
  const stats = [
    {
      value: "12",
      label: t.problem.stats.revenueShareLabel,
      context: t.problem.stats.revenueShareContext,
      suffix: "%",
      numericValue: 12,
    },
    {
      value: "0.003",
      label: t.problem.stats.perStreamLabel,
      context: t.problem.stats.perStreamContext,
      prefix: "$",
      numericValue: 0.003,
    },
    {
      value: "70",
      label: t.problem.stats.middlemenLabel,
      context: t.problem.stats.middlemenContext,
      suffix: "%",
      numericValue: 70,
    },
    {
      value: "0",
      label: t.problem.stats.transparencyLabel,
      context: t.problem.stats.transparencyContext,
      suffix: "%",
      numericValue: 0,
    },
  ];
  return (
    <section id="the-problem" className="relative py-16 md:py-20 px-6">
      {/* Darker gradient overlay for visual separation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Headline */}
        <motion.h2
          className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t.problem.heading}
        </motion.h2>

        {/* Body text */}
        <motion.p
          className="text-base md:text-lg text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {t.problem.body}
        </motion.p>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
