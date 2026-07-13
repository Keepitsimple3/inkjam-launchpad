## Goal

Turn the current side-by-side landing into an editorial, "book cover" waitlist page with three ambient interactive moments — no backend, no real submissions, everything client-side.

## 1. Hero rebuild — centered, reference-matched

Replace the split hero with a single centered stack, illustration as backdrop.

- Nav floats inline with the wordmark: `jam · about  INK JAM  community · blog` (wordmark centered, links flanking it)
- Headline stacks: **"Where writers meet."** in ink black, **"Stories grow."** in accent (serif italic), each on its own line
- Short lede (2 lines max), single CTA below: `Join the Waitlist`
- Illustration (`SketchPlaceholder` for now) sits **behind** the text as a soft, low-opacity backdrop — vase, typewriter, books framing left/right
- On mobile, illustration drops opacity further and becomes a bottom band
- Existing `useTypewriter` gets repurposed for the *living headline* below

New file: `src/components/Hero/LivingHeadline.tsx` + `.module.css` — a small hook that swaps hover-target words (`meet → gather → collide`, `grow → sharpen → bloom`) with a short ink-bleed transition. Falls back to static text with no JS.

## 2. Interactive: "Write your first line" + prompt-of-the-week (combined)

New section between `FeatureStrip` and `ThreeThings`, id `#desk`.

- A paper-card visual with a rotating prompt at top ("Write a goodbye in 50 words.", "Open with a lie.", "A room no one has entered in ten years.") — cycles every ~8s or on click of a small "↻ new prompt" chip
- Below the prompt: a textarea styled as ruled paper, blinking caret, serif font. Visitor can type freely
- Word count ticks up in the corner; at 50 words a soft "nice." appears
- Nothing is submitted. A muted line under the card reads: *"This is just for you. Real jams open with the waitlist."*
- Files: `src/components/Desk/Desk.tsx`, `Desk.module.css`, `src/hooks/usePromptRotator.ts`

## 3. Interactive: Ink signature pad (inside Waitlist)

Moves the waitlist section from "email box" to "sign the guestbook."

- Canvas-based signature pad, ink-black stroke with slight taper (pressure faked via velocity)
- Prompt: *"Sign the guestbook — founding writers get their signature in the first zine."*
- Buttons: `Clear` and `Save signature` (Save just downloads a PNG locally, no upload)
- Under it: `Joining #247` (see counter below) + `Add me to the waitlist` primary CTA that is visually disabled with tooltip *"Opens with the first jam."*
- Files: `src/components/Waitlist/SignaturePad.tsx`, `SignaturePad.module.css`. Rewrite `Waitlist.tsx` around it.

## 4. Founding writer perks strip

Replaces the current `ThreeThings` copy or sits directly under it (decide during build based on visual rhythm) — three tickets/stubs:

1. **Early access** — first jam invite before public launch
2. **A physical zine** — your signature + first line printed in the founding issue
3. **Credits mention** — name in the InkJam colophon, forever

Files: `src/components/Perks/Perks.tsx`, `Perks.module.css`. Ticket-stub styling with dashed perforation borders.

## 5. Client-side position counter

- `src/hooks/useSeededCounter.ts` — seeds from a fixed base (e.g. 231) plus a slow deterministic drift based on `Date.now()` so it reads the same across a session and grows ~1 every few minutes
- Rendered as `Joining #247` in the waitlist section, styled like a ticket stub number
- Honest fallback: if JS disabled, renders `Joining #—`

## 6. Micro-polish

- `story-link` style hover underlines on nav
- Fade-in on scroll for `Desk` and `Perks` sections (IntersectionObserver, ~200ms)
- Keep `useFastScroll` wired to nav

## Files touched

**New**
- `src/components/Hero/LivingHeadline.tsx` + `.module.css`
- `src/components/Desk/Desk.tsx` + `.module.css`
- `src/components/Perks/Perks.tsx` + `.module.css`
- `src/components/Waitlist/SignaturePad.tsx` + `.module.css`
- `src/hooks/usePromptRotator.ts`
- `src/hooks/useSeededCounter.ts`
- `src/hooks/useInView.ts` (small IntersectionObserver wrapper)

**Edited**
- `src/components/Hero/Hero.tsx` + `Hero.module.css` — centered stack, backdrop illustration
- `src/components/Header/Header.tsx` + `.module.css` — wordmark-centered nav
- `src/components/Waitlist/Waitlist.tsx` + `.module.css` — signature pad + counter + perks tie-in
- `src/routes/index.tsx` — insert `<Desk />` and `<Perks />` in the section order

## Explicitly out of scope

- No Lovable Cloud, no database, no email capture, no real signup
- No auth, no Discord/social links (none exist yet)
- No image generation — keep `SketchPlaceholder` until you provide real art

## Section order after build

Header → Hero → FeatureStrip → **Desk (write your first line)** → ThreeThings → **Perks (founding stubs)** → UpcomingJams → **Waitlist (signature + counter)** → Footer
