"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/bg-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/bg-hero.png"
        aria-hidden="true"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-black/60" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <Image
            src="/logo.png"
            alt="Shine"
            width={1340}
            height={880}
            priority
            sizes="(max-width: 768px) 55vw, (max-width: 1280px) 40vw, 520px"
            className="mx-auto w-[min(55vw,520px)] h-auto drop-shadow-[0_0_80px_rgba(0,0,254,0.4)]"
          />
        </motion.div>

        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-white font-normal mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {t.hero.tagline}
        </motion.p>

        <motion.a
          href="#newsletter"
          className="inline-block bg-accent text-text-primary font-semibold px-8 py-3 rounded-full text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,0,254,0.55)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          {t.hero.cta}
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
