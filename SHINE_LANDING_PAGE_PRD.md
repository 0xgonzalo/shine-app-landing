# SHINE — Landing Page PRD

> **Music belongs to those who create it.**
>
> Product Requirements Document — Landing Page v1.0
> March 2026 · Confidential

---

## 1. Overview

This PRD defines the design, structure, content, and technical specifications for the Shine landing page. The page serves as the first touchpoint for artists, fans, and potential investors, communicating Shine's mission and capturing early adopter interest through a newsletter signup.

| Field | Value |
|---|---|
| Project | Shine Landing Page |
| Stack | Next.js 14+ (App Router), TypeScript, Tailwind CSS v4 |
| Design System | Liquid Glass aesthetic — Black / White / Electric Blue (#2563EB) |
| Animations | Framer Motion + Three.js / React Three Fiber for 3D elements |
| Responsive | Mobile-first, breakpoints: 375px / 768px / 1024px / 1440px / 1920px |
| Newsletter | Next.js API Route → Mailchimp Marketing API |
| Deployment | Vercel (recommended) |

---

## 2. Design System & Visual Language

The Shine landing page follows a "Liquid Glass" aesthetic inspired by the brand's visual identity. The design merges depth, transparency, and fluid motion to communicate innovation, trust, and artistic sensibility.

### 2.1 Color Palette

```css
:root {
  --bg-primary: #000000;                    /* Page background — true black */
  --bg-glass: rgba(255, 255, 255, 0.04);    /* Frosted glass cards/containers */
  --bg-glass-hover: rgba(255, 255, 255, 0.08);
  --text-primary: #FFFFFF;                  /* Headings, CTAs */
  --text-secondary: #94A3B8;               /* Body text, labels (slate-400) */
  --accent: #2563EB;                        /* Electric blue — primary action */
  --accent-glow: #3B82F6;                   /* Lighter blue for glow effects */
  --accent-light: #60A5FA;                  /* Hover/active state */
  --border-glass: rgba(255, 255, 255, 0.08); /* Subtle card edge definition */
  --border-glass-hover: rgba(255, 255, 255, 0.15);
  --error: #EF4444;                         /* Form validation errors */
  --success: #22C55E;                       /* Success states */
}
```

### 2.2 Typography

Font pairing should feel editorial and premium:

- **Display / Headings:** "PP Neue Montreal" or "Satoshi" (variable weight 400–900). Fallback: "Syne" from Google Fonts.
- **Body:** "General Sans" or "DM Sans" for clean readability at small sizes.
- **Monospace accent:** "JetBrains Mono" for stats, data, or code-like elements.

Type scale (desktop):
- Hero headline: 72–96px (`clamp(3rem, 8vw, 6rem)`)
- Section headings: 40–48px
- Subheadings: 24–28px
- Body: 16–18px
- Captions: 12–14px
- Mobile reduces by ~25–30%

### 2.3 Glass & Material Effects

The "Liquid Glass" effect is achieved through layered CSS and optional WebGL:

- **Glass cards:** `background: rgba(255,255,255,0.03–0.06)`, `backdrop-filter: blur(20px–40px)`, `border: 1px solid rgba(255,255,255,0.08)`, `border-radius: 16–24px`.
- **Glow accents:** `box-shadow: 0 0 60px rgba(37,99,235,0.15)` on interactive elements.
- **Liquid blob background:** Animated SVG or Three.js shader with metaball/fluid simulation using the blue-black-white palette from the brand image. This is the ambient background layer.
- **Grain overlay:** A subtle noise texture (`opacity: 0.03–0.05`) over the entire page via a `::after` pseudo-element with `background-image: url('/noise.png')` and `pointer-events: none`.

### 2.4 3D Elements (React Three Fiber)

3D elements are used sparingly for visual impact — ambient decoration, not core UI:

- **Hero:** A floating, slowly rotating liquid sphere with refraction/glass material shader. Uses `MeshPhysicalMaterial` with `transmission: 1`, `roughness: 0.1`, `thickness: 2`, and an environment map for reflections. Subtly follows cursor position on desktop (parallax).
- **The Problem section (optional):** 3D particle field that coalesces into a broken chain or shattered disc, symbolizing the broken industry.
- **Performance:** Lazy load via `React.lazy()` + `Suspense`. Use `OffscreenCanvas` and reduced polygon counts on mobile. Provide a static radial gradient fallback for devices that don't support WebGL.

### 2.5 Motion & Animation (Framer Motion)

Animations follow a philosophy of "reveal, don't distract." Everything should feel intentional and cinematic.

- **Page load:** Staggered fade-in from bottom (`y: 30 → 0`, `opacity: 0 → 1`) with `0.1s` delay between elements.
- **Scroll-triggered reveals:** Use Framer Motion's `whileInView` with `viewport: { once: true, amount: 0.3 }`. Sections fade and slide in.
- **Parallax:** Background liquid blob moves at `0.5x` scroll speed. Foreground content at `1x`.
- **Hover states:** Glass cards lift slightly (`translateY: -4px`) with increased glow. CTAs scale to `1.02` with enhanced shadow.
- **Stats counter:** Numbers in "The Problem" section count up from 0 when scrolled into view (`useInView` + `animate`).
- **Smooth scroll:** Use `scroll-behavior: smooth` or **Lenis** for butter-smooth scrolling with lerp.
- **`prefers-reduced-motion`:** Disable ALL animations. Show static alternatives for 3D elements.

---

## 3. Section-by-Section Specification

---

### 3.1 HERO

| Field | Value |
|---|---|
| Purpose | Immediate emotional impact. Communicate the brand's core promise in under 3 seconds. |
| Height | `100vh` (full viewport) |
| Background | Animated liquid blob (Three.js shader or animated SVG gradient) filling full viewport. Black base with blue luminous tendrils and white caustic highlights, matching the brand image. |

#### Layout & Content

The hero is centered both vertically and horizontally (`flex items-center justify-center`), with content stacked in the middle of the viewport:

1. **SHINE wordmark:** Displayed large at the top-center of the content block. Font-size `~14–20vw` (responsive via `clamp()`). Weight 800–900. Pure white. `letter-spacing: 0.05em`. Optional: subtle `text-shadow` with blue glow (`0 0 80px rgba(37,99,235,0.3)`).

2. **Primary tagline** (below wordmark): *"Music belongs to those who create it."* — Size `~24–32px`. White. Weight 400. Slight fade-in delay (`0.3s` after wordmark).

3. **Secondary line** (below tagline): *"No middlemen. No algorithms. Just music."* — Size `~16–18px`. `text-secondary` color. Fade-in delay `0.5s`.

4. **CTA button:** *"Join the Movement"* — Rounded pill shape (`border-radius: 9999px`). Background: `--accent` (#2563EB). White text. `padding: 14px 36px`. Hover: `scale(1.03)`, glow intensifies. `onClick`: smooth scroll to Newsletter section.

5. **Scroll indicator:** A minimal animated chevron or "Scroll" text at bottom-center, `opacity: 0.5`, bouncing animation (`animate-bounce`).

#### 3D Element

Behind the text, a Three.js liquid glass sphere floats with slow rotation. Uses `MeshPhysicalMaterial` with `transmission` (glass), `roughness ~0.1`, `thickness ~2`, and an environment map. Subtly follows cursor position on desktop.

#### Responsive Behavior

- **Mobile (< 768px):** Wordmark scales to `~20vw` minimum `48px`. Taglines stack vertically. 3D sphere replaced with static radial gradient or reduced-poly fallback. CTA becomes full-width at bottom with safe-area padding.
- **Tablet (768–1024px):** Slight reduction in wordmark size. 3D sphere scales down `70%`.
- **Desktop (> 1024px):** Full experience with 3D sphere, parallax, and cursor-tracking.

---

### 3.2 Navigation Bar (Sticky)

A minimal sticky navigation appears after scrolling past the hero section (triggered via `IntersectionObserver`). Fixed at top for the rest of the scroll.

| Field | Value |
|---|---|
| Appearance | Glass bar: `background: rgba(0,0,0,0.6)`, `backdrop-filter: blur(20px)`, `border-bottom: 1px solid rgba(255,255,255,0.06)` |
| Height | `64px` desktop, `56px` mobile |
| z-index | `50` |

**Content:**
- **Left:** "SHINE" logotype (text, white, 18px, bold)
- **Center:** Section links — About · The Problem · Newsletter (smooth scroll `onClick`)
- **Right:** Social icons row (X, Instagram, Farcaster, Email) — 20px icons, white, `opacity: 0.6` hover `1`

**Mobile:** Hamburger menu icon reveals a fullscreen overlay navigation with the same glass effect and staggered link animations using Framer Motion `AnimatePresence`.

---

### 3.3 ABOUT

| Field | Value |
|---|---|
| Purpose | Explain what Shine is and why it exists. Convert the emotional hook from Hero into understanding. |
| Layout | Split layout: Left column (60%) for text, Right column (40%) for visual/3D element. On mobile, stacks vertically. |
| id | `#about` |

#### Content Structure

**Section headline:** *"What is Shine?"* — 40–48px, white, bold. Top-left of text column.

**Lead paragraph (large, ~20px):**
> Shine is a platform that connects artists and fans for real. No middlemen. No algorithms. No invisible contracts. When you love a song, you can buy it, collect it, and directly support the person who created it.

**Supporting paragraph (~16px, text-secondary):**
> Music has value again. Not because of views or streams, but because of what it means to you. Every purchase on Shine is a statement: this matters to me.

#### Feature Highlights (3 glass cards in a row)

Below the text, display three horizontal glass cards (`GlassCard` component) that summarize Shine's pillars:

| Card | Title | Description |
|---|---|---|
| 1 | Direct Support | 100% of your purchase goes to the artist. No hidden fees, no label cuts. |
| 2 | Collectible Music | Songs are unique collectibles. Your collection is yours to own and display. |
| 3 | No Crypto Needed | Web3 power, Web2 simplicity. No wallets, no gas fees, no jargon. |

Each card: `GlassCard` component with icon (Lucide) at top, title in white bold, description in `text-secondary`. On mobile: stack vertically, full-width.

#### Visual Element (Right Column)

An abstract visual occupies the right column: either an animated waveform visualization (Canvas), a floating vinyl disc with glass material, or an animated equalizer pattern. Should feel alive and musical.

#### Animation

- Text fades in from left (`x: -40 → 0`) as section enters viewport.
- Visual fades in from right (`x: 40 → 0`) with `0.2s` delay.
- Glass cards stagger in from bottom (delay: `0.1s`, `0.2s`, `0.3s`).
- Cards lift and glow on hover (`translateY: -4px`, `box-shadow` increase).

---

### 3.4 THE PROBLEM

| Field | Value |
|---|---|
| Purpose | Create urgency and emotional resonance by exposing the music industry's broken economics. Let the numbers speak. |
| Tone | Confrontational but not aggressive. Data-driven. |
| Layout | Full-width section with centered content. Darker gradient background to create visual separation and gravity. |
| id | `#the-problem` |

#### Content Structure

**Section headline:** *"Something is broken."* — 48–64px, white, bold, centered. Animated entrance: letter-by-letter reveal or `clip-path` wipe.

**Supporting text (~18px, text-secondary, centered, max-w-2xl):**
> The music industry generates $43 billion a year. Artists see just 12% of it. The rest disappears into labels, distributors, aggregators, and platforms. Your favorite artist is getting pennies while corporations profit from their art.

#### Stats Grid (4 data cards)

Below the text, a grid of glass-bordered stat cards (`StatCard` component). Each card has a large animated number, a label, and a short description:

| Stat | Label | Context |
|---|---|---|
| 12% | Artist revenue share | Of the $43B generated annually, artists receive only 12 cents of every dollar. |
| $0.003 | Per stream average | An artist needs ~350,000 streams to earn a US minimum wage month. |
| 70% | Revenue to middlemen | Labels, distributors, and platforms absorb the majority before artists see a cent. |
| 0% | Transparency | Most artists have no visibility into how their royalties are calculated or distributed. |

**Visual treatment:**
- Each stat number uses monospace font (JetBrains Mono) at `56–72px`, electric blue color.
- Numbers animate counting up from 0 when scrolled into view (`useInView` + Framer Motion `animate`).
- Cards have a subtle red/orange warning glow (`box-shadow`) to convey urgency, contrasting with the blue used elsewhere.
- Optional: A pie chart or bar visualization showing the 12% vs 88% split, animated on scroll.

**Grid layout:** `grid-cols-2` on desktop, `grid-cols-1` on mobile. `gap-6`.

#### Closing Statement

Below the stats, a centered closing statement in larger text (`24–28px`, white, bold):

> *"The system wasn't built for artists. Shine was."*

This acts as a bridge to the Newsletter section and reinforces the brand positioning.

#### Animation

- Section fades in with a slight darkening overlay effect.
- Headline uses a text-reveal animation (clip-path or letter stagger).
- Stat cards stagger in from bottom with count-up animation on numbers.
- Closing statement fades in last with subtle scale (`0.95 → 1`).

---

### 3.5 NEWSLETTER

| Field | Value |
|---|---|
| Purpose | Capture early adopter interest. This is the primary conversion goal of the entire page. |
| Layout | Centered content block within a prominent glass card. `max-w-lg` (~600px). Visually elevated. |
| id | `#newsletter` |

#### Content

**Section headline:** *"Be part of what's next."* — 40px, white, bold, centered.

**Supporting text (~16px, text-secondary, centered):**
> Join our community of artists and fans building a fairer music industry. Get early access, exclusive updates, and be the first to know when Shine launches.

#### Form Design

The form is contained within a large glass card with enhanced glow (`box-shadow: 0 0 80px rgba(37,99,235,0.12)`):

- **Name input:** Placeholder `"Your name"`. Full width. Glass style: `bg-white/5`, `border: 1px solid rgba(255,255,255,0.1)`, `rounded-xl`, `p-3.5 px-5`, white text, `placeholder:text-slate-500`.
- **Email input:** Placeholder `"your@email.com"`. Same styling.
- **Submit button:** *"Join Shine"* — Full width. Background `--accent`. White text bold. `rounded-full`. `h-12`. Hover: brighten + `scale(1.02)`. Active: `scale(0.98)`.
- **Spacing:** `gap-3` between inputs, `mt-5` before button.

#### Form States

| State | Behavior |
|---|---|
| Default | Inputs empty, button enabled, no messages. |
| Validation Error | Red border on invalid field. Inline error message below field (e.g., "Please enter a valid email"). Client-side validation with `zod`. |
| Submitting | Button shows spinner/loading. Inputs disabled. Button text → "Joining..." |
| Success | Form fades out via `AnimatePresence`, replaced by success message: *"Welcome to Shine. You're in."* with a checkmark animation. |
| Error (API) | Inline error below form: *"Something went wrong. Please try again."* Button re-enables. |

#### API Route Specification

The form submits to a Next.js API route that forwards data to Mailchimp:

| Field | Value |
|---|---|
| Endpoint | `POST /api/subscribe` |
| Request Body | `{ name: string, email: string }` |
| Validation | Server-side: `zod` schema. Email format + non-empty name. |
| Mailchimp | Uses `@mailchimp/mailchimp_marketing` SDK. Calls `lists.addListMember()` with `status: 'subscribed'` and `merge_fields: { FNAME: name }`. |
| Env Variables | `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`, `MAILCHIMP_SERVER_PREFIX` |
| Error Handling | `409` for already subscribed (friendly message). `400` for invalid data. `500` for upstream failures. Rate limiting recommended via middleware. |
| Success Response | `200: { success: true, message: "Successfully subscribed" }` |
| Error Response | `4xx/5xx: { success: false, error: "..." }` |

**Implementation file:** `app/api/subscribe/route.ts`

```typescript
// Pseudocode structure for the API route:
import mailchimp from "@mailchimp/mailchimp_marketing";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

// POST handler:
// 1. Parse and validate body with schema
// 2. Call mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, { ... })
// 3. Handle 400 (already subscribed / invalid) and 500 (upstream)
// 4. Return JSON response
```

---

### 3.6 SOCIALS & FOOTER

| Field | Value |
|---|---|
| Purpose | Provide social proof and community access points. Close the page with brand reinforcement. |
| Layout | Centered minimal footer. Glass divider line at top. Content stacked vertically. |

#### Social Links

Section headline: *"Connect with Shine"* — 28–32px, white, centered.

Social links displayed as a horizontal row of icon buttons:

| Platform | Icon | Link Behavior |
|---|---|---|
| X (Twitter) | Custom X logo SVG or Lucide | Opens in new tab. `aria-label="Follow Shine on X"` |
| Instagram | Lucide `instagram` | Opens in new tab. `aria-label="Follow Shine on Instagram"` |
| Farcaster | Custom SVG icon (Farcaster logo) | Opens in new tab. `aria-label="Follow Shine on Farcaster"` |
| Email | Lucide `mail` | `mailto:` link. `aria-label="Email Shine"` |

#### Icon Styling

- Size: `24px` icons inside `48px` circular glass buttons.
- Default: White icons, `opacity: 0.5`, glass background.
- Hover: `opacity: 1`, blue glow, `scale(1.1)`.
- Gap: `gap-4` to `gap-6` between icons.

#### Footer Content

Below the social icons:

- **SHINE wordmark** — `20–24px`, bold, white, `opacity: 0.6`.
- **Tagline:** *"Music belongs to those who create it."* — `14px`, `text-slate-500`.
- **Copyright:** *"© 2026 Shine. All rights reserved."* — `12px`, `text-slate-600`.
- **Bottom padding:** `pb-10` to `pb-16` for breathing room and safe-area on mobile.

---

## 4. Technical Architecture

### 4.1 Project Structure

```
shine-landing/
├── app/
│   ├── layout.tsx              ← Root layout, fonts, metadata
│   ├── page.tsx                ← Landing page composition
│   ├── globals.css             ← Tailwind + CSS variables + grain overlay
│   └── api/
│       └── subscribe/
│           └── route.ts        ← Mailchimp API route
├── components/
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── About.tsx
│   ├── TheProblem.tsx
│   ├── Newsletter.tsx
│   ├── Footer.tsx
│   ├── GlassCard.tsx           ← Reusable glass card component
│   ├── StatCard.tsx            ← Animated stat counter card
│   ├── LiquidBlob.tsx          ← Three.js background scene
│   └── ui/                    ← Shared UI primitives (Button, Input)
├── lib/
│   ├── mailchimp.ts            ← Mailchimp client setup
│   └── validations.ts          ← Zod schemas
├── public/
│   ├── fonts/
│   ├── icons/                  ← Custom SVGs (Farcaster, X logo, etc.)
│   └── noise.png               ← Grain overlay texture
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── .env.local
```

### 4.2 Key Dependencies

| Package | Purpose | Version |
|---|---|---|
| `next` | Framework | `^14.x` |
| `react` / `react-dom` | UI | `^18.x` |
| `typescript` | Type safety | `^5.x` |
| `tailwindcss` | Styling | `^4.x` |
| `framer-motion` | Animations | `^11.x` |
| `@react-three/fiber` | 3D rendering | `^8.x` |
| `@react-three/drei` | 3D utilities/helpers | `^9.x` |
| `three` | WebGL engine | `^0.160+` |
| `@mailchimp/mailchimp_marketing` | Newsletter API | `^3.x` |
| `zod` | Validation | `^3.x` |
| `lenis` | Smooth scroll | `^1.x` |
| `lucide-react` | Icons | `^0.3x` |

### 4.3 Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FID (First Input Delay) | < 100ms |
| Bundle size (initial JS) | < 200KB gzipped |
| 3D scene load | Lazy loaded, < 150KB |

### 4.4 Tailwind Config Extensions

```typescript
// tailwind.config.ts — extend with:
{
  theme: {
    extend: {
      colors: {
        accent: '#2563EB',
        'accent-glow': '#3B82F6',
        'accent-light': '#60A5FA',
      },
      fontFamily: {
        display: ['Satoshi', 'Syne', 'sans-serif'],
        body: ['DM Sans', 'General Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        glass: '20px',
        'glass-heavy': '40px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
    },
  },
}
```

### 4.5 SEO & Metadata

Set in `app/layout.tsx` via Next.js `metadata` export:

- **Title:** "Shine — Music belongs to those who create it"
- **Description:** "A platform connecting artists and fans directly. No middlemen, no algorithms. Support the music you love."
- **Open Graph:** Custom social preview image (1200×630), type `website`.
- **Twitter card:** `summary_large_image`.
- **Structured data:** `Organization` schema via JSON-LD in `<head>`.
- **Canonical URL:** Set to production domain.
- **Favicon + Apple touch icon.**

### 4.6 Accessibility

- All interactive elements keyboard-navigable with visible focus rings (`ring-2 ring-accent`).
- Color contrast ratios meet WCAG 2.1 AA standard.
- 3D elements: `aria-hidden="true"`, decorative only.
- Form inputs: proper `<label>`, `aria-describedby` for errors, `aria-live="polite"` for status messages.
- `prefers-reduced-motion`: Disable all Framer Motion animations and 3D scene. Show static alternatives.
- Skip-to-content link at top of page.
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`.

---

## 5. Content Copy Reference

All copy in English. Translations can be added as a future iteration.

| Location | Copy |
|---|---|
| Hero — Wordmark | SHINE |
| Hero — Tagline | Music belongs to those who create it. |
| Hero — Subline | No middlemen. No algorithms. Just music. |
| Hero — CTA | Join the Movement |
| About — Headline | What is Shine? |
| About — Lead | Shine is a platform that connects artists and fans for real. No middlemen. No algorithms. No invisible contracts. When you love a song, you can buy it, collect it, and directly support the person who created it. |
| About — Support | Music has value again. Not because of views or streams, but because of what it means to you. Every purchase on Shine is a statement: this matters to me. |
| About — Card 1 | **Direct Support** — 100% of your purchase goes to the artist. No hidden fees, no label cuts. |
| About — Card 2 | **Collectible Music** — Songs are unique collectibles. Your collection is yours to own and display. |
| About — Card 3 | **No Crypto Needed** — Web3 power, Web2 simplicity. No wallets, no gas fees, no jargon. |
| Problem — Headline | Something is broken. |
| Problem — Body | The music industry generates $43 billion a year. Artists see just 12% of it. The rest disappears into labels, distributors, aggregators, and platforms. Your favorite artist is getting pennies while corporations profit from their art. |
| Problem — Close | The system wasn't built for artists. Shine was. |
| Newsletter — Headline | Be part of what's next. |
| Newsletter — Support | Join our community of artists and fans building a fairer music industry. Get early access, exclusive updates, and be the first to know when Shine launches. |
| Newsletter — CTA | Join Shine |
| Newsletter — Success | Welcome to Shine. You're in. |
| Footer — Headline | Connect with Shine |
| Footer — Tagline | Music belongs to those who create it. |
| Footer — Copyright | © 2026 Shine. All rights reserved. |

---

## 6. Implementation Milestones

| Phase | Scope | Deliverable |
|---|---|---|
| 1 | Project scaffolding, Tailwind config, CSS variables, fonts, grain overlay, global layout | Skeleton app with design tokens |
| 2 | Hero section (static), Navbar, smooth scroll, responsive layout | Hero + Nav functional on all breakpoints |
| 3 | About section, GlassCard component, feature cards | About section complete |
| 4 | The Problem section, StatCard with counter animation, stats grid | Problem section complete |
| 5 | Newsletter form, API route, Mailchimp integration, form states | Newsletter functional end-to-end |
| 6 | Footer/Socials, SEO metadata, accessibility audit | Full page complete (2D) |
| 7 | Framer Motion animations, scroll reveals, hover states, Lenis smooth scroll | Animated page |
| 8 | Three.js liquid blob, 3D sphere in hero, WebGL fallbacks, performance optimization | Full 3D experience + production deploy |

---

*End of Document*
