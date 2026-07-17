
# InkJam v2 — from "airy waitlist" to "flat-pastel zine"

The current site reads boring because it's mostly one warm beige on repeat, sections are too spaced apart, and there's no visual rhythm. This plan changes the palette, tightens the layout, and adds editorial character — while staying minimal (no gradients, no vibrancy screaming, no filler quotes).

## 1. New palette (pastel-flat, art-friendly)

Rebuild tokens in `src/styles.css` around a **pastel green + maroon/orange** system that matches flat pastel illustration art.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f4efe4` | base background (warm cream, less yellow than now) |
| `--paper-2` | `#e9e2d1` | alternate section band |
| `--sage` | `#c8d6bf` | pastel green — soft section bands, chips |
| `--sage-ink` | `#3d5a44` | deep sage — headings on light, body accents |
| `--maroon` | `#7a2e2a` | primary accent — CTAs, key marks |
| `--clay` | `#d97b4f` | pastel orange — highlights, marginalia |
| `--butter` | `#f0d9a8` | soft warm highlight band |
| `--ink` | `#241d1a` | body text |
| `--ink-soft` | `#5a4f47` | secondary text |

Rule: flat fills only. No gradients. Accents used sparingly — one accent per section, not three.

## 2. Tighter spacing (density 3 / 5)

Global reduction of vertical air:

- Section padding: `88px → 56px` desktop, `72px → 40px` mobile.
- Hero: drop from `40px 28px 80px` to `28px 28px 44px`; move the CTA closer to the headline.
- Card gaps: `22px → 14px`.
- Waitlist card padding: `44px → 28px`.
- Header: `16px → 12px` vertical.
- Kill the empty gap between FeatureStrip and Desk by making them share a background band.

## 3. Color-blocked sections (instead of one flat page)

Sections alternate between three flat bands — no gradients, just solid fills separated by 1px hairlines:

```text
Header        paper
Hero          paper           (with pastel-orange marginalia)
FeatureStrip  sage            (flat pastel green band)
Desk          paper-2
ThreeThings   paper
Perks         butter          (flat warm band, ticket stubs pop)
UpcomingJams  sage
Waitlist      maroon          (dark band — the "cover" of the zine)
Footer        paper
```

The Waitlist becoming a dark maroon block is the single dramatic moment — everything before it is soft pastel.

## 4. Editorial marginalia

Add small ornamental marks that live in the margins, not the main column:

- Section eyebrows get a **folio number** on the opposite side (`No. 01 — The Desk` … `p. 12` on the right).
- Small hand-drawn glyphs (asterism `⁂`, pilcrow `¶`, section mark `§`) as pastel-orange marginalia beside headings.
- A thin rule + folio at the top of each section (`inkjam / issue 00 / p.03`) — like a zine running head.
- Corner tick marks (crop-mark style) at the four corners of the Waitlist card.

All rendered in CSS/Unicode, no new assets.

## 5. Bold typography (kept minimal)

- Headings: bump display size up (`clamp(44px, 7vw, 84px)` stays for hero, but H2s go `28→36px min`).
- Italic serif stays for accent words but **remove the pull-quote** under the hero ("A blank page is a beginning…") — user said no quotes.
- Add a tiny uppercase mono-ish label above every section title (`— section 03 —`) using the existing sans, tracked out.

## 6. Textured backgrounds (subtle)

One reusable CSS-only paper-grain utility applied at ~4% opacity to `paper` and `sage` bands. SVG noise via `background-image: url("data:image/svg+xml…")` — no image files, no perf cost.

## 7. Component-level changes

- **Header**: remove the 3-column grid; go left brand + right nav, tighter, with a thin sage underline on hover instead of maroon.
- **Hero**: remove the "Try a prompt" ghost button (redundant with Desk section right below); keep only the maroon CTA. Add folio + asterism marginalia.
- **FeatureStrip**: switch to sage band, icons filled maroon on paper circles.
- **Desk / ThreeThings**: reduce card padding, add corner folio numbers, drop hover-lift (feels too SaaS).
- **Perks**: keep ticket-stub metaphor, move to butter band so stubs read as printed tickets.
- **Waitlist**: maroon background, paper-colored card floating on top, signature pad gets crop-mark corners, ticket number in clay/orange.
- **Footer**: single line, folio-style (`inkjam · issue 00 · founding waitlist · ©2026`).

## 8. What is NOT changing

- No new functionality (still no auth, no real submit).
- No framework changes.
- Existing hooks (`useFastScroll`, `useTypewriter`, `useSeededCounter`, `useInView`, `usePromptRotator`) stay.
- CSS Modules per component stays.
- Illustration placeholders stay as `SketchPlaceholder` — art can be dropped in later.

## Files touched

- `src/styles.css` — new token set, paper-grain utility
- `src/components/Header/*` — layout + hover color
- `src/components/Hero/*` — spacing, remove ghost button + quote, marginalia
- `src/components/FeatureStrip/*` — sage band
- `src/components/Desk/*` — density + folio
- `src/components/ThreeThings/*` — density + folio
- `src/components/Perks/*` — butter band
- `src/components/UpcomingJams/*` — sage band, tighter rows
- `src/components/Waitlist/*` — maroon band, crop marks, clay ticket
- `src/components/Footer/*` — folio line
- New: `src/components/Folio/Folio.tsx` + `.module.css` — reusable section head (`— No. 03 —  THE DESK  ⁂  p.12`)

Approve and I'll build it.
