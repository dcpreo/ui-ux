# andritz-design-system-v2 — Full Design Specification

## 1. Overview

**Name:** andritz-design-system-v2
**Type:** Framework-agnostic design token system + component specification
**Coverage:** All product lines — internal enterprise apps, customer portals, marketing sites
**Theme Modes:** Light + Dark

### Creative North Star: "The Monolithic Engine v2"

The UI is treated as a high-performance industrial machine: solid, authoritative, and deeply layered. Hierarchy is defined through tonal shifts (not lines), extreme whitespace, and functional minimalism. v2 extends the original Monolithic Engine with full Dark Mode support for control room environments and enhanced data visualization guidance.

### Key Principles

- **Precision over Decoration:** Every element serves a functional purpose.
- **Structural Depth:** Hierarchy defined by material stacking, not borders.
- **Monolithic Presence:** Bold typography with engineering-label aesthetics.
- **No pure black:** Use `on-surface` (#191c1d / dark: #dae2fd) instead of #000000.

---

## 2. Color System

See `references/color-system.md` for full deep-dive.

### Primary Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `primary` | #005c97 | #9bcaff | Brand touchpoints, primary actions |
| `primary-container` | #0075be | #004b93 | CTA gradient endpoint, containers |
| `on-primary` | #ffffff | #003062 | Text on primary |
| `on-primary-container` | #f3f7ff | #96bdff | Text on primary container |
| `secondary` | #49607f | #b0c8ec | Supporting elements |
| `secondary-container` | #c1d9fd | #314866 | Secondary containers |
| `tertiary` | #4b5a69 | #b8c8da | Slate accents |
| `tertiary-container` | #637383 | #39485c | Tertiary containers |
| `error` | #ba1a1a | #ffb4ab | Critical states |
| `error-container` | #ffdad6 | #93000a | Error backgrounds |

### Surface Hierarchy (Tonal Layering)

| Token | Light | Dark | Layer Role |
|-------|-------|------|------------|
| `surface` | #f8fafb | #0f1419 | Base floor |
| `surface-dim` | #d8dadb | #0f1419 | Dimmed base |
| `surface-bright` | #f8fafb | #31394d | Bright accent |
| `surface-container-lowest` | #ffffff | #0a0f18 | Elevated cards (white lift) |
| `surface-container-low` | #f2f4f5 | #141b28 | Secondary plates |
| `surface-container` | #eceeef | #1a2130 | Primary content regions |
| `surface-container-high` | #e6e8e9 | #242c3d | Emphasized zones |
| `surface-container-highest` | #e1e3e4 | #2d3449 | Input fills, highest emphasis |
| `on-surface` | #191c1d | #dae2fd | Primary text |
| `on-surface-variant` | #404751 | #c2c6d2 | Secondary text |

### Utility Colors

| Token | Light | Dark |
|-------|-------|------|
| `outline` | #707882 | #8c919c |
| `outline-variant` | #c0c7d2 | #424751 |
| `inverse-surface` | #2e3132 | #dae2fd |
| `inverse-on-surface` | #eff1f2 | #283044 |
| `inverse-primary` | #9bcaff | #005c97 |
| `surface-tint` | #0062a0 | #9bcaff |

---

## 3. Typography

See `references/typography.md` for full scale and usage guidelines.

Single font family (Inter) across all roles for industrial consistency.

| Scale | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `display-lg` | 3.5rem (56px) | 700 | 1.1 | -0.02em | Hero KPIs |
| `display-md` | 2.5rem (40px) | 700 | 1.15 | -0.01em | Section KPIs |
| `display-sm` | 2rem (32px) | 700 | 1.2 | -0.01em | Card KPIs |
| `headline-lg` | 1.5rem (24px) | 600 | 1.3 | 0 | Page titles |
| `headline-md` | 1.25rem (20px) | 600 | 1.4 | 0 | Section heads |
| `title-md` | 1rem (16px) | 600 | 1.4 | 0 | Card titles |
| `title-sm` | 0.875rem (14px) | 600 | 1.4 | 0 | Sub-titles |
| `body-md` | 0.875rem (14px) | 400 | 1.6 | 0 | Body text |
| `body-sm` | 0.75rem (12px) | 400 | 1.5 | 0 | Captions |
| `label-lg` | 0.875rem (14px) | 500 | 1.2 | 0.05em | Button labels |
| `label-md` | 0.75rem (12px) | 500 | 1.2 | 0.1em | All-caps labels |
| `label-sm` | 0.625rem (10px) | 600 | 1.2 | 0.1em | Engineering tags |

**Editorial tip:** Pair `display-lg` metric with `label-sm` (all caps, tracked) directly underneath — mimics engineering technical drawing callouts.

---

## 4. Core Design Rules

### 4.1 No-Line Rule

1px solid borders for sectioning are **prohibited**. Boundaries must be defined solely through background color shifts or tonal transitions.

- Sidebar vs main: shift from `surface` to `surface-container-low`
- Card on page: `surface-container-lowest` on `surface-container` background
- List items: 32px vertical whitespace, no horizontal dividers

### 4.2 Zero Radius (0px)

All components use **sharp corners (0px border-radius)**. No exceptions.

- Buttons: 0px
- Cards: 0px
- Inputs: 0px
- Modals: 0px
- **Exception:** Status chips and tags use `9999px` (pill shape)

### 4.3 Ghost Border

When accessibility requires a visible container edge:

- Token: `outline-variant` at **15% opacity**
- Must be "felt, not seen"
- Never use 100% opaque high-contrast borders

### 4.4 Ambient Shadow

Floating elements (modals, dropdowns, tooltips) use atmospheric shadows:

- Blur: 32px to 64px
- Color: `on-surface` at 6% opacity
- No dated drop shadows — use ambient occlusion effect
- In Dark Mode: reduce opacity to 4%, increase blur to 48-80px

### 4.5 Glass & Gradient Rule

- **CTA Depth:** Primary buttons use subtle linear gradient from `primary` to `primary-container` at 135deg
- **Industrial Frost:** Floating navigation/modals use `surface-container-lowest` at 85% opacity with 20px backdrop-blur

---

## 5. Elevation & Depth

See `references/elevation.md` for full rules.

| Level | Purpose | Light Surface | Dark Surface | Shadow |
|-------|---------|--------------|-------------|--------|
| 0 | Base | `surface` | `surface` | None |
| 1 | Content regions | `surface-container-low` | `surface-container-low` | None |
| 2 | Interactive cards | `surface-container-lowest` | `surface-container-lowest` | None |
| 3 | Emphasized zones | `surface-container-high` | `surface-container-high` | None |
| 4 | Floating (dropdown, tooltip) | `surface-container-lowest` | `surface-container-low` | Ambient 6% |
| 5 | Modal overlay | `surface-container-lowest` | `surface-container-lowest` | Ambient 6% + scrim |

**Scrim:** Dark mode uses `surface` at 60% opacity; Light mode uses `on-surface` at 30% opacity.

---

## 6. Spacing & Layout

### Base Unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight inline gaps |
| `space-2` | 8px | Icon-to-text, chip padding |
| `space-3` | 12px | Compact list items |
| `space-4` | 16px | Card internal padding |
| `space-6` | 24px | Section padding |
| `space-8` | 32px | Content separator (replaces dividers) |
| `space-10` | 40px | Section gaps |
| `space-12` | 48px | Page section spacing |
| `space-16` | 64px | Major layout gaps |

### Grid

- **Desktop:** 12-column, max-width 1440px, 16px gutters
- **Tablet:** 8-column, 16px gutters
- **Mobile:** 4-column, 16px gutters, 16px page margins

---

## 7. Component Specifications

See `references/components.md` for full component specs.

### 7.1 Buttons

| Variant | Background | Text Color | Border | Notes |
|---------|-----------|------------|--------|-------|
| Primary | Gradient `primary` -> `primary-container` @135deg | `on-primary` | None | Heavy horizontal padding (24px) |
| Secondary | `surface-container-high` | `on-primary-fixed-variant` | None | Solid fill, no border |
| Tertiary | Transparent | `surface-tint` | None | Text-only, 2px bottom underline on hover |
| Destructive | `error` | `on-error` | None | Same shape as Primary |
| Ghost | Transparent | `on-surface` | Ghost border | For low-emphasis actions |

**Sizes:** `sm` (32px), `md` (40px), `lg` (48px)

### 7.2 Input Fields

- **Background:** `surface-container-highest`
- **Border:** None (no outline in rest state)
- **Focus:** 2px solid `primary` bottom-border only
- **Error:** Background shifts to `error-container`, text to `on-error-container`
- **Disabled:** 40% opacity, no interaction

### 7.3 Cards

- **Background:** `surface-container-lowest`
- **Border:** None (Ghost border only when required for accessibility)
- **Dividers:** Forbidden — use 32px whitespace or tonal sub-zones

### 7.4 Tables

- **Header:** `surface-container-high` background, `label-md` all-caps text
- **Rows:** Alternating `surface-container-lowest` / `surface-container-low`
- **Borders:** None — tonal alternation provides separation

### 7.5 Navigation

- **Top nav:** `surface-container` with Industrial Frost (backdrop-blur)
- **Active indicator:** 2px bottom-border `primary`
- **Side nav:** `surface-container-low`, active item uses `primary-fixed-dim` tint

### 7.6 Badges / Chips

- **Exception to 0px rule:** Use `9999px` border-radius (pill shape)
- **Status chips:** `label-sm` all-caps, 1px solid border of status color, transparent fill

### 7.7 Modals

- **Background:** `surface-container-lowest`
- **Shadow:** Ambient shadow (64px blur, 6% on-surface)
- **Scrim:** Per elevation table
- **Width:** 480px (sm), 640px (md), 800px (lg)

---

## 8. Do's and Don'ts

### Do:

- Use extreme whitespace — industrial spaces are massive
- Use "All Caps" for labels and small UI elements (engineering labeling)
- Align text to a strict baseline grid
- Use `primary-fixed-dim` for background elements needing a hint of brand color
- Use tonal zones to group related data

### Don't:

- Use any border-radius (except chips/tags)
- Use pure black (#000000) — use `on-surface` tokens
- Use 1px divider lines
- Use icons as purely decorative elements
- Use card shadows on every element — reserve elevation for true floating UI
