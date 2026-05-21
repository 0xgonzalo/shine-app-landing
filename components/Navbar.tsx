"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import LaunchAppButton from "./LaunchAppButton";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const navLinks = [
  { key: "about" as const, href: "#about" },
  { key: "newsletter" as const, href: "#newsletter" },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FarcasterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M21.28 0.280029H6.72C4.93775 0.280029 3.22849 0.988027 1.96824 2.24827C0.707998 3.50852 0 5.21777 0 7.00003L0 21C0 22.7823 0.707998 24.4915 1.96824 25.7518C3.22849 27.012 4.93775 27.72 6.72 27.72H21.28C23.0623 27.72 24.7715 27.012 26.0318 25.7518C27.292 24.4915 28 22.7823 28 21V7.00003C28 5.21777 27.292 3.50852 26.0318 2.24827C24.7715 0.988027 23.0623 0.280029 21.28 0.280029ZM22.232 20.307V20.895C22.3111 20.8864 22.3912 20.8944 22.467 20.9185C22.5429 20.9426 22.6129 20.9823 22.6725 21.035C22.7321 21.0877 22.7801 21.1523 22.8133 21.2247C22.8466 21.297 22.8643 21.3754 22.8655 21.455V22.1177H16.8653V21.4539C16.8666 21.3743 16.8845 21.2958 16.9179 21.2235C16.9513 21.1513 16.9994 21.0868 17.0591 21.0342C17.1189 20.9815 17.189 20.942 17.2649 20.918C17.3408 20.8941 17.4209 20.8862 17.5 20.895V20.307C17.5 20.0504 17.6785 19.838 17.9177 19.7727L17.906 14.6814C17.7217 12.6549 15.9927 11.067 13.8892 11.067C11.7857 11.067 10.0567 12.6549 9.87233 14.6814L9.86067 19.7657C10.1267 19.8147 10.4813 20.0084 10.4907 20.307V20.895C10.5698 20.8864 10.6498 20.8944 10.7257 20.9185C10.8016 20.9426 10.8715 20.9823 10.9312 21.035C10.9908 21.0877 11.0388 21.1523 11.072 21.2247C11.1052 21.297 11.123 21.3754 11.1242 21.455V22.1177H5.124V21.4539C5.12532 21.3744 5.1432 21.296 5.1765 21.2239C5.2098 21.1517 5.2578 21.0872 5.31741 21.0346C5.37703 20.982 5.44696 20.9425 5.52274 20.9184C5.59851 20.8944 5.67847 20.8864 5.7575 20.895V20.307C5.7575 20.0119 5.992 19.7774 6.28717 19.7564V10.5455H5.7155L5.00383 8.17603H8.085V5.88236H19.6933V8.17603H22.9857L22.274 10.5444H21.7023V19.7564C21.9963 19.7762 22.232 20.013 22.232 20.307Z" />
    </svg>
  );
}

function LanguageToggle({ lang, onToggle, t, className }: { lang: "en" | "es"; onToggle: () => void; t: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={t}
      className={className ?? "text-xs font-bold tracking-wider text-white/70 hover:text-white border border-white/15 hover:border-white/40 rounded-full px-3 py-1.5 transition-colors"}
    >
      {lang === "en" ? "ES" : "EN"}
    </button>
  );
}

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggle, t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    // Observe the hero section
    const hero = document.querySelector("section");
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Floating launcher — only over the hero, before the scroll-revealed
          navbar takes over. Avoids overlapping the navbar's social cluster. */}
      <AnimatePresence>
        {!visible && (
          <motion.div
            className="fixed top-4 right-4 md:top-5 md:right-6 z-[70]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <LaunchAppButton />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.header
            className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.06)]"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="max-w-7xl mx-auto px-6 h-16 md:h-16 flex items-center justify-between">
              {/* Logo */}
              <a href="#" aria-label="Shine" className="flex items-center">
                <img src="/logo.png" alt="Shine" className="h-7 w-auto" />
              </a>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-white transition-colors"
                  >
                    {t.nav[link.key]}
                  </a>
                ))}
              </div>

              {/* Social icons (desktop) */}
              <div className="hidden md:flex items-center gap-4">
                <a href="https://x.com/Shinemusic_app" target="_blank" rel="noopener noreferrer" aria-label="Follow Shine on X" className="text-white opacity-60 hover:opacity-100 transition-opacity">
                  <XIcon className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/shinemusic.app/" target="_blank" rel="noopener noreferrer" aria-label="Follow Shine on Instagram" className="text-white opacity-60 hover:opacity-100 transition-opacity">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a href="https://farcaster.xyz/shinemusic" target="_blank" rel="noopener noreferrer" aria-label="Follow Shine on Farcaster" className="text-white opacity-60 hover:opacity-100 transition-opacity">
                  <FarcasterIcon className="w-5 h-5" />
                </a>
                <a href="mailto:shinemusic.xyz@gmail.com" aria-label="Email Shine" className="text-white opacity-60 hover:opacity-100 transition-opacity">
                  <Mail className="w-5 h-5" />
                </a>
                <LanguageToggle lang={lang} onToggle={toggle} t={t.nav.switchLanguage} />
                <LaunchAppButton />
              </div>

              {/* Mobile actions */}
              <div className="md:hidden flex items-center gap-3">
                <LanguageToggle lang={lang} onToggle={toggle} t={t.nav.switchLanguage} />
                <button
                  className="text-white"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-[40px] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-5 right-6 text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-2xl text-white font-[family-name:var(--font-display)] uppercase"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {t.nav[link.key]}
                </motion.a>
              ))}

              <div className="flex items-center gap-6 mt-8">
                <a href="https://x.com/Shinemusic_app" target="_blank" rel="noopener noreferrer" aria-label="Follow Shine on X" className="text-white opacity-60 hover:opacity-100">
                  <XIcon className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/shinemusic.app/" target="_blank" rel="noopener noreferrer" aria-label="Follow Shine on Instagram" className="text-white opacity-60 hover:opacity-100">
                  <InstagramIcon className="w-6 h-6" />
                </a>
                <a href="https://farcaster.xyz/shinemusic" target="_blank" rel="noopener noreferrer" aria-label="Follow Shine on Farcaster" className="text-white opacity-60 hover:opacity-100">
                  <FarcasterIcon className="w-6 h-6" />
                </a>
                <a href="mailto:shinemusic.xyz@gmail.com" aria-label="Email Shine" className="text-white opacity-60 hover:opacity-100">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
