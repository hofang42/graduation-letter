# 🎓 Graduation Invitation — Cinematic Digital Experience

A cinematic, emotionally-driven digital graduation invitation built with Next.js, Framer Motion, and Tailwind CSS. Every scroll feels like turning the page of a beautifully printed book.

## ✨ Features

- **8 Cinematic Sections**: Hero → Journey → Memories → Gratitude → Schedule → Details → RSVP → Closing
- **Custom Cursor**: Glowing cyan dot with trailing circle, ring effect on hover
- **Ambient Background**: Slowly drifting radial gradients + floating particles
- **Page Entrance**: Full-screen dark overlay that fades out on load
- **3D Scene**: Spline 3D graduation scene integration
- **Scroll Animations**: Viewport-triggered fade-ups, staggered children, parallax
- **SVG Timeline**: Line draws itself as you scroll through the journey
- **Confetti Burst**: Animated celebration on RSVP submission
- **Film Grain**: Subtle texture overlay on the closing section
- **Responsive**: Desktop, tablet, and mobile optimized
- **Bilingual**: Vietnamese + English content throughout
- **Accessible**: Skip-to-content, reduced-motion support, proper focus states

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 | App Router, React Server Components |
| React 19 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations |
| Spline | 3D scene |
| lucide-react | Icons |
| shadcn/ui | Component primitives |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Customization Guide

### 👤 Personal Information

Edit these files to customize with your own details:

| What | Where |
|------|-------|
| **Name** | `src/components/sections/hero.tsx` (line ~100), `closing.tsx` |
| **Degree** | `hero.tsx` — degree title line |
| **University** | `hero.tsx` — university name line |
| **Date/Time** | `hero.tsx` — date/time cards |
| **Venue** | `event-info.tsx` — `infoItems` array |
| **Milestones** | `journey.tsx` — `milestones` array |
| **Gratitude messages** | `gratitude.tsx` — `gratitudeCards` array |
| **Schedule** | `celebration-timeline.tsx` — `events` array |
| **Page title/SEO** | `src/app/layout.tsx` — `metadata` object |

### 📸 Photos

Replace Unsplash URLs in `src/components/sections/memories.tsx` — the `photos` array. Use high-quality images with descriptive alt text.

### 🎭 Spline 3D Scene

Replace the Spline scene URL in `hero.tsx`:
```tsx
<SplineScene scene="YOUR_SPLINE_SCENE_URL" />
```

Create your scene at [spline.design](https://spline.design) and use the public URL.

### 🎨 Brand Colors

All colors are defined in `src/app/globals.css`:

```css
--color-grad-green:     #51B848;  /* Achievement, milestones */
--color-grad-orange:    #F37021;  /* CTAs, celebration */
--color-grad-blue:      #034EA2;  /* Navigation, interactive */
--color-grad-dark-blue: #162670;  /* Backgrounds, depth */
--color-grad-cyan:      #0092B3;  /* Accents, highlights */
```

### ✏️ Fonts

Fonts are configured in `src/app/layout.tsx`:
- **Cinzel** — Headings (serif)
- **Outfit** — Body text (sans-serif)
- **Great Vibes** — Decorative/signature (script)

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # CSS variables, custom cursor, glassmorphism
│   ├── layout.tsx           # Root layout, fonts, global components
│   ├── page.tsx             # Main page assembly
│   └── favicon.ico
├── components/
│   ├── sections/
│   │   ├── hero.tsx             # Full-screen invitation
│   │   ├── journey.tsx          # Milestone timeline
│   │   ├── memories.tsx         # Photo gallery
│   │   ├── gratitude.tsx        # Three pillars of thanks
│   │   ├── celebration-timeline.tsx  # Day's events
│   │   ├── event-info.tsx       # Venue, date, details + map
│   │   ├── rsvp.tsx             # RSVP form with confetti
│   │   └── closing.tsx          # Cinematic closing
│   └── ui/
│       ├── spline.tsx           # Spline 3D scene wrapper
│       ├── spotlight.tsx        # SVG spotlight effect
│       ├── card.tsx             # shadcn card primitives
│       ├── button.tsx           # shadcn button
│       ├── custom-cursor.tsx    # Glowing cursor + trail
│       ├── ambient-background.tsx  # Floating particles
│       └── page-entrance.tsx    # Opening overlay
└── lib/
    ├── animations.ts        # Framer Motion variants library
    └── utils.ts             # cn() utility
```

## 🌐 Deployment

Deploy to Vercel for the best experience:

```bash
npx vercel
```

Or build and serve statically:
```bash
npm run build
npm start
```

## 📝 License

Personal project — customize freely for your own graduation.
