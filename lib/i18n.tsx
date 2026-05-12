"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "es";

const STORAGE_KEY = "shine-lang";

export const translations = {
  en: {
    nav: {
      about: "About",
      newsletter: "Newsletter",
      switchLanguage: "Cambiar a español",
    },
    hero: {
      tagline: "Music belongs to those who create it.",
      cta: "Join Us",
    },
    about: {
      heading: "What is Shine?",
      paragraph1:
        "Shine is a platform that connects artists and fans for real. No middlemen. No algorithms. When you love a song, you can buy it, collect it, and directly support the person who created it, whether through a purchase or virtual tipping during a live show.",
      paragraph2:
        "Music has value again. Not because of views or streams, but because of what it means to you. Every purchase on Shine is real support. Not a stream. Not a like.",
      features: {
        directSupportTitle: "Direct Support",
        directSupportDesc:
          "100% of your purchase goes to the artist. No hidden fees, no label cuts.",
        collectibleTitle: "Collectible Music",
        collectibleDesc:
          "Songs are unique collectibles. Your collection is yours to own and display.",
      },
    },
    problem: {
      heading: "Something is broken.",
      body:
        "The music industry makes $43B a year. Artists see just 12% of it. The rest goes to middlemen.",
      stats: {
        revenueShareLabel: "Artist revenue share",
        revenueShareContext:
          "Of the $43B generated annually, artists receive only 12 cents of every dollar.",
        perStreamLabel: "Per stream average",
        perStreamContext:
          "An artist needs ~350,000 streams to earn a US minimum wage month.",
        middlemenLabel: "Revenue to middlemen",
        middlemenContext:
          "Labels, distributors, and platforms absorb the majority before artists see a cent.",
        transparencyLabel: "Transparency",
        transparencyContext:
          "Most artists have no visibility into how their royalties are calculated or distributed.",
      },
    },
    newsletter: {
      heading: "Be part of what’s next.",
      description:
        "Join our community of artists and fans. We’re building a fairer music industry — get early access, exclusive updates, and be the first to know when Shine launches.",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      submit: "Join Shine",
      submitting: "Joining...",
      successTitle: "Welcome to Shine. You’re in.",
      genericError: "Something went wrong. Please try again.",
      nameRequired: "Name is required",
      emailInvalid: "Please enter a valid email",
    },
    footer: {
      heading: "Connect with Shine",
      tagline: "Music belongs to those who create it.",
      copyright: "© 2026 Shine. All rights reserved.",
    },
  },
  es: {
    nav: {
      about: "Sobre Shine",
      newsletter: "Newsletter",
      switchLanguage: "Switch to English",
    },
    hero: {
      tagline: "La música le pertenece a quien la crea.",
      cta: "Súmate",
    },
    about: {
      heading: "¿Qué es Shine?",
      paragraph1:
        "Shine es una plataforma que conecta artistas y fans de verdad. Sin intermediarios. Sin algoritmos. Cuando una canción te gusta, podés comprarla, coleccionarla y apoyar directamente a la persona que la creó, ya sea con una compra o con propinas virtuales durante un show en vivo.",
      paragraph2:
        "La música vuelve a tener valor. No por las visualizaciones ni los streams, sino por lo que significa para vos. Cada compra en Shine es apoyo real. No es un stream. No es un like.",
      features: {
        directSupportTitle: "Apoyo directo",
        directSupportDesc:
          "El 100% de tu compra va al artista. Sin comisiones ocultas ni cortes del sello.",
        collectibleTitle: "Música coleccionable",
        collectibleDesc:
          "Las canciones son piezas únicas. Tu colección es tuya: la poseés y la mostrás.",
      },
    },
    problem: {
      heading: "Algo está roto.",
      body:
        "La industria de la música genera 43.000 millones de dólares al año. Los artistas reciben apenas el 12%. El resto se lo llevan los intermediarios.",
      stats: {
        revenueShareLabel: "Ingresos para el artista",
        revenueShareContext:
          "De los 43.000 millones generados cada año, los artistas reciben solo 12 centavos por cada dólar.",
        perStreamLabel: "Promedio por stream",
        perStreamContext:
          "Un artista necesita ~350.000 streams para igualar un mes de salario mínimo en EE.UU.",
        middlemenLabel: "Para intermediarios",
        middlemenContext:
          "Sellos, distribuidoras y plataformas se quedan con la mayor parte antes de que el artista vea un centavo.",
        transparencyLabel: "Transparencia",
        transparencyContext:
          "La mayoría de los artistas no tiene visibilidad sobre cómo se calculan ni distribuyen sus regalías.",
      },
    },
    newsletter: {
      heading: "Sumate a lo que viene.",
      description:
        "Unite a nuestra comunidad de artistas y fans. Estamos construyendo una industria más justa — accedé primero, recibí novedades exclusivas y entérate antes que nadie cuando Shine lance.",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@email.com",
      submit: "Unirme a Shine",
      submitting: "Uniéndote...",
      successTitle: "Bienvenido a Shine. Ya estás adentro.",
      genericError: "Algo salió mal. Intentalo de nuevo.",
      nameRequired: "El nombre es obligatorio",
      emailInvalid: "Ingresá un email válido",
    },
    footer: {
      heading: "Conectá con Shine",
      tagline: "La música le pertenece a quien la crea.",
      copyright: "© 2026 Shine. Todos los derechos reservados.",
    },
  },
} as const;

export type Translations = (typeof translations)[Language];

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored === "en" || stored === "es") {
      setLangState(stored);
      return;
    }
    const browser = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "";
    if (browser.startsWith("es")) setLangState("es");
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (next: Language) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  };

  const toggle = () => setLang(lang === "en" ? "es" : "en");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
