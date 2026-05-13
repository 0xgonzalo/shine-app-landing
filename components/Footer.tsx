"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

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

const socials = [
  { icon: XIcon, label: "Follow Shine on X", href: "https://x.com/Shinemusic_app" },
  { icon: InstagramIcon, label: "Follow Shine on Instagram", href: "https://www.instagram.com/shinemusic.app/" },
  { icon: FarcasterIcon, label: "Follow Shine on Farcaster", href: "https://farcaster.xyz/shinemusic" },
  { icon: Mail, label: "Email Shine", href: "mailto:shinemusic.xyz@gmail.com" },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative py-20 md:py-24 px-6">
      {/* Glass divider */}
      <div className="max-w-5xl mx-auto border-t border-[rgba(255,255,255,0.06)] mb-16" />

      <div className="max-w-5xl mx-auto text-center">
        <motion.h3
          className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          {t.footer.heading}
        </motion.h3>

        {/* Social icons */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="w-12 h-12 rounded-full bg-[rgba(239,238,234,0.04)] border border-[rgba(239,238,234,0.08)] flex items-center justify-center text-text-primary opacity-50 hover:opacity-100 hover:scale-110 hover:shadow-[0_0_30px_rgba(140,82,255,0.3)] transition-all duration-300"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>

        {/* Branding */}
        <div className="space-y-3">
          <p className="font-[family-name:var(--font-display)] uppercase text-xl md:text-2xl font-bold text-white opacity-60">
            SHINE
          </p>
          <p className="text-sm text-slate-500">
            {t.footer.tagline}
          </p>
          <p className="text-xs text-slate-600">
            {t.footer.copyright}
          </p>
        </div>
      </div>

      {/* Bottom safe-area padding */}
      <div className="h-10 md:h-16" />
    </footer>
  );
}
