"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-hero.png')" }}
        aria-hidden="true"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-black/40" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.h1
          className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,10vw,7rem)] font-extrabold leading-none tracking-[0.05em] text-white mb-5"
          style={{ textShadow: "0 0 80px rgba(37,99,235,0.3)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          SHINE
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-white font-normal mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Music belongs to those who create it.
        </motion.p>

        <motion.p
          className="text-sm md:text-base text-text-secondary mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          No middlemen. No algorithms. Just music.
        </motion.p>

        <motion.a
          href="#newsletter"
          className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded-full text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          Join the Movement
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5 }}
      >
        <ChevronDown className="w-6 h-6 text-white animate-bounce" />
      </motion.div>
    </section>
  );
}
