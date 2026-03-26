"use client";

import { motion } from "framer-motion";
import StatCard from "./StatCard";

const stats = [
  {
    value: "12",
    label: "Artist revenue share",
    context: "Of the $43B generated annually, artists receive only 12 cents of every dollar.",
    suffix: "%",
    numericValue: 12,
  },
  {
    value: "0.003",
    label: "Per stream average",
    context: "An artist needs ~350,000 streams to earn a US minimum wage month.",
    prefix: "$",
    numericValue: 0.003,
  },
  {
    value: "70",
    label: "Revenue to middlemen",
    context: "Labels, distributors, and platforms absorb the majority before artists see a cent.",
    suffix: "%",
    numericValue: 70,
  },
  {
    value: "0",
    label: "Transparency",
    context: "Most artists have no visibility into how their royalties are calculated or distributed.",
    suffix: "%",
    numericValue: 0,
  },
];

export default function TheProblem() {
  return (
    <section id="the-problem" className="relative py-24 md:py-32 px-6">
      {/* Darker gradient overlay for visual separation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Headline */}
        <motion.h2
          className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Something is broken.
        </motion.h2>

        {/* Body text */}
        <motion.p
          className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          The music industry generates $43 billion a year. Artists see just 12% of it. The rest disappears into labels, distributors, aggregators, and platforms. Your favorite artist is getting pennies while corporations profit from their art.
        </motion.p>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
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

        {/* Closing statement */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl font-bold text-white italic"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          &ldquo;The system wasn&rsquo;t built for artists. Shine was.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
