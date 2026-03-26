"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface StatCardProps {
  value: string;
  label: string;
  context: string;
  prefix?: string;
  suffix?: string;
  numericValue?: number;
}

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => {
    if (value < 1) {
      return `${prefix}${v.toFixed(3)}${suffix}`;
    }
    return `${prefix}${Math.round(v)}${suffix}`;
  });
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, motionValue, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function StatCard({ value, label, context, prefix = "", suffix = "", numericValue }: StatCardProps) {
  const num = numericValue ?? parseFloat(value.replace(/[^0-9.]/g, ""));

  return (
    <motion.div
      className="bg-[rgba(255,255,255,0.04)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(239,68,68,0.1)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="font-[family-name:var(--font-mono)] text-5xl md:text-6xl font-bold text-accent mb-2">
        <AnimatedNumber value={num} prefix={prefix} suffix={suffix} />
      </div>
      <div className="text-white font-semibold text-lg mb-1">{label}</div>
      <div className="text-text-secondary text-sm">{context}</div>
    </motion.div>
  );
}
