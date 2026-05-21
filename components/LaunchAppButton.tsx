"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

// Presentational pill — sized for both the floating-over-hero variant and
// the in-navbar variant. Positioning (fixed vs. inline) is owned by the
// caller in Navbar.tsx so the two variants can swap without overlapping.
export default function LaunchAppButton({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <a
      href="https://app.shinemusic.app"
      aria-label={t.nav.launchApp}
      className={`inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,0,254,0.55)] md:px-5 md:py-2.5 ${className ?? ""}`}
    >
      {t.nav.launchApp}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}
