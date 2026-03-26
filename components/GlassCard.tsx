"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={`
        bg-[rgba(255,255,255,0.04)] backdrop-blur-[20px]
        border border-[rgba(255,255,255,0.08)] rounded-2xl
        p-6 transition-all duration-300
        ${hover ? "hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(37,99,235,0.15)]" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
