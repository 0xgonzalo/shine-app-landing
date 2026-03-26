"use client";

import { motion } from "framer-motion";
import { Heart, Disc3, Zap } from "lucide-react";
import GlassCard from "./GlassCard";

const features = [
  {
    icon: Heart,
    title: "Direct Support",
    description: "100% of your purchase goes to the artist. No hidden fees, no label cuts.",
  },
  {
    icon: Disc3,
    title: "Collectible Music",
    description: "Songs are unique collectibles. Your collection is yours to own and display.",
  },
  {
    icon: Zap,
    title: "No Crypto Needed",
    description: "Web3 power, Web2 simplicity. No wallets, no gas fees, no jargon.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-white mb-8">
              What is Shine?
            </h2>

            <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
              Shine is a platform that connects artists and fans for real. No middlemen. No algorithms. No invisible contracts. When you love a song, you can buy it, collect it, and directly support the person who created it.
            </p>

            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              Music has value again. Not because of views or streams, but because of what it means to you. Every purchase on Shine is a statement: this matters to me.
            </p>
          </motion.div>

          {/* Visual column */}
          <motion.div
            className="lg:col-span-2 flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Animated equalizer visualization */}
            <div className="relative w-64 h-64 flex items-end justify-center gap-2">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 rounded-full bg-gradient-to-t from-accent to-accent-light"
                  animate={{
                    height: [
                      `${20 + Math.random() * 40}%`,
                      `${40 + Math.random() * 50}%`,
                      `${15 + Math.random() * 35}%`,
                      `${50 + Math.random() * 40}%`,
                      `${20 + Math.random() * 40}%`,
                    ],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
              {/* Glow behind the equalizer */}
              <div className="absolute inset-0 bg-accent/10 blur-[60px] rounded-full" aria-hidden="true" />
            </div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <GlassCard className="h-full">
                <feature.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
