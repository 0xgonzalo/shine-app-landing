"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

// Always-visible launcher sitting above the scroll-revealed Navbar so the
// path into the app is one click from the hero. Higher z-index than the
// navbar (z-50) so it's never hidden behind it.
export default function LaunchAppButton() {
  const { t } = useLanguage();
  return (
    <a
      href="https://app.shinemusic.app"
      aria-label={t.nav.launchApp}
      className="fixed top-4 right-4 md:top-5 md:right-6 z-[70] inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,0,254,0.55)] md:px-5 md:py-2.5"
    >
      {t.nav.launchApp}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}
