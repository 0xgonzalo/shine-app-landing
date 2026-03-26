import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Shine — Music belongs to those who create it",
  description:
    "A platform connecting artists and fans directly. No middlemen, no algorithms. Support the music you love.",
  openGraph: {
    title: "Shine — Music belongs to those who create it",
    description:
      "A platform connecting artists and fans directly. No middlemen, no algorithms. Support the music you love.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shine — Music belongs to those who create it",
    description:
      "A platform connecting artists and fans directly. No middlemen, no algorithms. Support the music you love.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
