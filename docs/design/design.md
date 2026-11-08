---
version: anydesign-1
name: Wael Ettazi portfolio, two-colour print system
source: design-refs (5 local poster and cover images)
captured_at: 2026-11-08
description: |
  A warm dark ground, bone paper and one ochre ink, treated like a cheap two-colour
  screenprint. Grain and hard edges carry the mood, and heavy condensed titles carry
  the voice, so the developer's work stays the content.
colors:
  ground-sunken: '#0E0A07'
  ground: '#16100C'
  ground-raised: '#211A14'
  ground-high: '#2E261E'
  paper: '#E5D8C6'
  paper-muted: '#B8A692'
  ink: '#D5AF41'
  ink-deep: '#927232'
  on-ink: '#16100C'
  line: '#3A3026'
  line-control: '#7A6A58'
  error: '#E8957F'
  success: '#AEB886'
typography:
  display:
    {
      fontFamily: 'Archivo, sans-serif',
      fontSize: 240px,
      fontWeight: 800,
      lineHeight: 0.88,
      letterSpacing: -0.025em,
    }
  heading:
    {
      fontFamily: 'Archivo, sans-serif',
      fontSize: 80px,
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: -0.015em,
    }
  body:
    {
      fontFamily: 'Archivo, sans-serif',
      fontSize: 17px,
      fontWeight: 400,
      lineHeight: 1.6,
    }
  caption-mono:
    {
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 13px,
      fontWeight: 400,
      lineHeight: 1.4,
    }
spacing:
  base: 4px
  scale: [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192]
rounded:
  none: 0px
  sm: 2px
  full: 999px
components:
  button-primary:
    {
      backgroundColor: '{colors.ink}',
      textColor: '{colors.on-ink}',
      rounded: '{rounded.none}',
      padding: 12px 32px,
    }
  button-secondary:
    {
      backgroundColor: 'transparent',
      textColor: '{colors.paper}',
      rounded: '{rounded.none}',
      padding: 12px 32px,
    }
  field:
    {
      backgroundColor: '{colors.ground-sunken}',
      textColor: '{colors.paper}',
      rounded: '{rounded.none}',
      padding: 12px 16px,
    }
---

# Design Analysis: Wael Ettazi portfolio, two-colour print system

> Analysis generated with the `anydesign` skill. Date: 2026-11-08. Emphasis: mood and design system

## Source

Five local images in `design-refs`: the posters for Funeral Parade of Roses, Twin Peaks and Hannibal, the Tindersticks "Curtains" sleeve, and an antlered figure on cracked ochre wood. Colours come from `extract_colors.py`; mood and composition from viewing each image. Limitation: these are images, not interfaces, so components and layout below are derived for this site rather than observed.

## TL;DR

Every reference is a dark or flat field hit by one strong printed colour, with visible grain and figures cut hard against it. The system keeps that logic and spends its boldness on one move: large titles printed slightly off register. The third-party references are mood sources only and never appear on the site.

## 1. Visual identity

### 1.1 Surface description

- **Personality:** nocturnal, tactile, unhurried, exact. ✅ Grain or print texture is present in four of the five images.
- **Mood:** a cinema lobby after closing. ✅ Warm blacks and aged paper dominate rather than cold neutrals.
- **Stylistic references:** Japanese art-house posters of the late 1960s, 1990s record sleeves. ⚠️
- **Information density:** low, with one idea per screen. ✅ Each poster holds one figure and one title.
- **Implicit positioning:** a developer with an eye, not a designer who also codes. ⚠️ Taken from the brief.

### 1.2 Brand voice / Atmosphere

Restraint is treated as respect for the audience. An employer has a minute, so the page gives one idea at a time and states it in plain words. The atmosphere stays in the materials, in the grain, ground and ink, and never interferes with reading the work.

### 1.3 The "ONE brand thing"

- **The thing:** an ochre layer, `{colors.ink}` (#D5AF41), printed 0.014em out of register behind bone display type.
- **Why it carries the brand:** it names the screenprint process that links all five references.
- **How the rest is restrained:** one accent, hard edges, no shadows or gradients on components.
- **Where it appears:** one title per page, and never on body text or in the admin.

## 2. Design System (tokens)

### 2.1 Colors

| Token           | Hex     | Role                        | Where it appears                        | Confidence |
| --------------- | ------- | --------------------------- | --------------------------------------- | ---------- |
| `ground`        | #16100C | Page                        | Sampled from the ochre wood image       | ✅         |
| `ground-sunken` | #0E0A07 | Inputs                      | Derived from ground                     | ⚠️         |
| `ground-raised` | #211A14 | Raised surfaces             | Derived from ground                     | ⚠️         |
| `ground-high`   | #2E261E | Disabled states             | Derived from ground                     | ⚠️         |
| `paper`         | #E5D8C6 | Text                        | Sampled from the Curtains sleeve        | ✅         |
| `paper-muted`   | #B8A692 | Secondary text              | Between sleeve tans #B39179 and #DCCCB8 | ⚠️         |
| `ink`           | #D5AF41 | Action, focus, print offset | Sampled from the ochre wood image       | ✅         |
| `ink-deep`      | #927232 | Ochre shadow tone           | Sampled from the ochre wood image       | ✅         |
| `line`          | #3A3026 | Dividers                    | Derived from ground                     | ⚠️         |
| `line-control`  | #7A6A58 | Form controls               | Derived, tuned for 3:1                  | ⚠️         |
| `error`         | #E8957F | Form errors                 | Lightened from sleeve rose #885950      | ⚠️         |
| `success`       | #AEB886 | Form success                | Lightened from sleeve leaf green        | ⚠️         |

### 2.2 Typography

Archivo, variable weight and width, with Helvetica Neue and Arial as fallbacks. IBM Plex Mono for technical facts. ✅ Both are chosen, not detected. Archivo was picked for the tight poster grotesks on Funeral Parade and Curtains; its width axis also gives the condensed feel of the Twin Peaks lettering.

| Token          | Size              | Weight            | Line-height | Use                         |
| -------------- | ----------------- | ----------------- | ----------- | --------------------------- |
| `display`      | 72 to 240px fluid | 800 at 72% width  | 0.88        | Hero title                  |
| `heading`      | 44 to 80px fluid  | 700 at 80% width  | 1           | Section titles              |
| `body`         | 17px              | 400 at 100% width | 1.6         | Reading text                |
| `caption-mono` | 13px              | 400               | 1.4         | Stack tags, dates, metadata |

Titles use sentence case with tight negative tracking, as on the Funeral Parade poster.

### 2.3 Spacing

4px base, on the scale in the frontmatter. Section gaps are fluid from 80 to 192px. ✅

### 2.4 Radii

Zero on all controls and images, because print has hard edges. `{rounded.full}` (999px) is only for round status marks.

### 2.5 Elevation system

| Level | Name   | Treatment                          | Use    |
| ----- | ------ | ---------------------------------- | ------ |
| 0     | Ground | `{colors.ground}` (#16100C)        | Page   |
| 1     | Raised | `{colors.ground-raised}` (#211A14) | Panels |

Flat by design, with surface tone instead of shadow. Decorative depth comes from a page-wide grain, a vignette, and an ochre light leak along one section edge.

### 2.6 Borders

1px `{colors.line}` (#3A3026) for dividers and `{colors.line-control}` (#7A6A58) for controls. Focus is a 2px `{colors.ink}` (#D5AF41) outline at 3px offset.

### 2.7 Accessibility quick-check

From `design-a11y.md`: paper on ground 13.44:1, muted on ground 8.0:1, ink on ground 9.01:1, and every text pair passes AAA. The control border reaches 3:1 for AA non-text contrast.

## 3. Components Inventory

### 3.1 Generic components

#### button-primary

- Variants: solid ochre block
- Sizes: one, 48px minimum height
- Visible states: hover to paper, focus outline, disabled
- Padding/Radius: 12px 32px, zero radius
- Confidence: ✅ defined in `Button.module.css`

#### button-secondary

- Variants: outlined
- Sizes: one, 48px minimum height
- Visible states: hover to ochre border and text, focus outline
- Padding/Radius: 12px 32px, zero radius
- Confidence: ✅ defined in `Button.module.css`

#### field

- Variants: single line and multiline
- Sizes: one, 48px minimum height
- Visible states: hover, focus, invalid with a linked error message
- Padding/Radius: 12px 16px, zero radius
- Confidence: ✅ defined in `Field.module.css`

### 3.2 Signature components

**Misregistered display title.** An ochre text-shadow with no blur sits behind bone type, composed in `Display`. It is signature because it is the print process itself. It appears on one title per page.

**Duotone cover.** Any image is mapped to ground and either paper or ink, with a grain layer, so a grid of different projects reads as one printed set.

## 4. Layout & Composition

### 4.1 Grid & containers

12 columns from 768px, one column below. Maximum page width is 1600px with a fluid gutter of 16 to 40px. Hierarchy comes from size first, then weight.

### 4.2 Composition patterns

Offset poster: a large title hangs left and small supporting text is placed low on the right, leaving a deliberate empty quadrant. Cells use explicit start columns to create it.

### 4.3 Responsive behavior

| Breakpoint   | Behaviour                      |
| ------------ | ------------------------------ |
| Under 768px  | Single column, offsets removed |
| 768px and up | 12 columns with offsets        |

Controls are at least 48px tall, over the 44px touch target. Display and heading sizes use `clamp()`.

### 4.4 Image behavior

- Project covers and gallery images: always through the duotone treatment.
- Reference posters: never published.

## 5. Reconstruction Notes

Stack: Next.js with CSS Modules and CSS variables, as the brief requires. Fonts load through `next/font/google`.

Quick wins: change `--color-ink` to re-ink the entire site, since nothing else hardcodes the accent.

Tricky bits: the grain animates with stepped transforms rather than an SVG filter, to stay cheap to paint. Duotone relies on blend modes inside an isolated stacking context. `font-stretch` needs the width axis loaded.

Implicit states: hover, focus, disabled and invalid are defined. Loading and empty states are designed with their pages.

| Layer  | Confidence | Why                                                    |
| ------ | ---------- | ------------------------------------------------------ |
| Colour | High       | Sampled from the references, then checked for contrast |
| Type   | Medium     | Chosen by resemblance to the references                |
| Layout | Medium     | Derived, since the references are not interfaces       |

## 6. Do's and Don'ts

### Do

- Reserve `{colors.ink}` (#D5AF41) for action, focus and the print offset.
- Set titles in sentence case at `{typography.display}` tracking, as on the Funeral Parade poster.
- Pass every project image through the duotone treatment.
- Keep `{typography.caption-mono}` for technical facts such as stack tags and dates.
- Leave one quadrant empty in each hero, as the posters do.

### Don't

- Don't misregister more than one title per page.
- Don't round images or controls; `{rounded.none}` (0px) is the rule.
- Don't add a second accent. Rose and leaf tones exist only as feedback colours.
- Don't use pure black or white; `{colors.ground}` (#16100C) and `{colors.paper}` (#E5D8C6) replace them.
- Don't publish the reference posters on the site.

## 7. Open Questions

- Funeral Parade's pink (#F1C9E1) is a strong alternative ink. Changing `--color-ink` would be enough to try it.
- Whether the owner has more of their own work for the /design section. So far only the ochre wood image is theirs, and only that image may be published.

## 8. Companion files

- `design-tokens.json`, generated from this file.
- `design-a11y.md`, the contrast table.
