"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";

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
  { label: "About", href: "#about" },
  { label: "The Problem", href: "#the-problem" },
  { label: "Newsletter", href: "#newsletter" },
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
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M5.315 2.1c.791-.058 1.597-.087 2.42-.084l.495.003c.878.004 1.74.022 2.584.053l.497.019c.834.033 1.65.08 2.445.14h.003c.447.034.89.071 1.326.112l.263.026c.293.03.581.063.864.098l.28.036c.2.027.397.055.59.085l.259.04.15.024.133.023.099.018.103.02.098.019.102.021.096.021.1.023.094.022.097.024.092.024.096.026.089.025.051.015.045.013.09.027.086.027.042.014.044.015.085.029.082.03.04.015.042.016.08.031.078.031.076.032.037.016.038.017.073.033.071.033.034.017.036.017.067.034.065.034.032.017.033.018.062.035.06.035.029.017.03.018.057.035.054.035.027.018.013.009.053.036.05.036.013.009.012.009.048.036.046.036.012.009.011.01.043.036.041.036.01.009.01.01.039.036.037.035.009.009.009.01.035.035.033.035.017.018.016.018.031.035.029.034.015.018.014.018.027.034.026.034.013.018.012.018.024.034.023.034.011.017.011.018.021.034.02.034.01.018.01.018.018.034.017.034.009.017.008.018.016.034.015.034.007.017.008.018.013.034.013.034.006.018.006.018.012.037.01.034v.008l.005.018.01.037.004.018.004.02.008.037.004.019.003.019.007.038.003.02.003.019.005.04.003.019.002.02.005.04.002.02.002.02.003.04.002.02v.021l.003.041.001.02v.022l.002.042v4.873l-.002.042v.021l-.001.021-.003.041v.021l-.002.02-.003.04-.002.02-.002.02-.005.04-.003.02-.003.019-.005.039-.003.02-.003.019-.007.038-.004.019-.004.02-.008.037-.004.019-.004.018-.01.037-.005.018v.008l-.005.018-.01.037-.006.018-.006.018-.013.034-.013.034-.007.018-.008.017-.015.034-.016.034-.008.018-.009.017-.017.034-.018.034-.01.018-.01.017-.02.034-.021.034-.011.018-.011.017-.023.034-.024.034-.012.018-.013.018-.026.034-.027.034-.014.018-.015.018-.029.034-.031.035-.016.018-.017.018-.033.035-.035.035-.009.01-.009.009-.037.035-.039.036-.01.01-.01.009-.041.036-.043.036-.011.01-.012.009-.046.036-.048.036-.012.009-.013.009-.05.036-.053.036-.013.009-.027.018-.054.035-.057.035-.03.018-.029.017-.06.035-.062.035-.033.018-.032.017-.065.034-.067.034-.036.017-.034.017-.071.033-.073.033-.038.017-.037.016-.076.032-.078.031-.08.031-.042.016-.04.015-.082.03-.085.029-.044.015-.042.014-.086.027-.09.027-.045.013-.051.015-.089.025-.096.026-.092.024-.097.024-.094.022-.1.023-.096.021-.098.019-.102.021-.103.02-.099.018-.133.023-.15.024-.259.04c-.193.03-.39.058-.59.085l-.28.036c-.283.035-.571.068-.864.098l-.263.026c-.436.041-.879.078-1.326.112h-.003c-.795.06-1.611.107-2.445.14l-.497.019c-.844.031-1.706.049-2.584.053l-.495.003c-.823.003-1.629-.026-2.42-.084C3.052 21.828 1 19.607 1 16.875V7.125c0-2.732 2.052-4.953 4.315-5.025z" />
    </svg>
  );
}

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
              <a href="#" className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                SHINE
              </a>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Social icons (desktop) */}
              <div className="hidden md:flex items-center gap-4">
                <a href="https://x.com/Shinemusic_xyz" target="_blank" rel="noopener noreferrer" aria-label="Follow Shine on X" className="text-white opacity-60 hover:opacity-100 transition-opacity">
                  <XIcon className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/shinemusic.xyz/" target="_blank" rel="noopener noreferrer" aria-label="Follow Shine on Instagram" className="text-white opacity-60 hover:opacity-100 transition-opacity">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a href="https://farcaster.xyz/shinemusic" target="_blank" rel="noopener noreferrer" aria-label="Follow Shine on Farcaster" className="text-white opacity-60 hover:opacity-100 transition-opacity">
                  <FarcasterIcon className="w-5 h-5" />
                </a>
                <a href="mailto:shinemusic.xyz@gmail.com" aria-label="Email Shine" className="text-white opacity-60 hover:opacity-100 transition-opacity">
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-white"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
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
                  className="text-2xl text-white font-[family-name:var(--font-display)]"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="flex items-center gap-6 mt-8">
                <a href="https://x.com/Shinemusic_xyz" target="_blank" rel="noopener noreferrer" aria-label="Follow Shine on X" className="text-white opacity-60 hover:opacity-100">
                  <XIcon className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/shinemusic.xyz/" target="_blank" rel="noopener noreferrer" aria-label="Follow Shine on Instagram" className="text-white opacity-60 hover:opacity-100">
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
