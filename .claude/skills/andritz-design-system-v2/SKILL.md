---
name: ckm:andritz-design-system-v2
description: Andritz Precision industrial design system v2 with dark/light theme variants. Three-layer token architecture (primitive->semantic->component), Material Design surface hierarchy, sharp 0px corners, tonal layering, industrial component specifications. Use for Andritz enterprise apps, customer portals, marketing sites.
argument-hint: "[component or token]"
license: MIT
metadata:
  author: claudekit
  version: "2.0.0"
---

# Andritz Design System v2 — The Monolithic Engine

Precision industrial design system with Light + Dark themes, three-layer token architecture, and Material Design surface hierarchy.

## When to Use

- Andritz enterprise applications (internal tools, dashboards)
- Customer-facing portals and data platforms
- Marketing sites and landing pages
- Control room / dark-environment interfaces (Dark Mode)
- Any project requiring industrial precision aesthetics

## Creative North Star

The UI is a high-performance industrial machine: solid, authoritative, deeply layered. Hierarchy through tonal shifts (not lines), extreme whitespace, functional minimalism.

## Core Rules (Non-Negotiable)

1. **0px border-radius** on all components (exception: chips/tags use 9999px pill)
2. **No-Line Rule** — no 1px dividers; use tonal shifts for separation
3. **No pure black** — use `on-surface` tokens instead of #000000
4. **Ghost Border** — `outline-variant` at 15% opacity when accessibility requires edges
5. **Ambient Shadow** — `on-surface` at 6% opacity, 32-64px blur for floating elements only

## Token Architecture

```
Primitive (raw hex/rem values)
       |
Semantic (purpose aliases, light + dark)
       |
Component (per-component mappings)
```

Load full spec: `design-system.md`

## Quick Reference

| Need | File |
|------|------|
| Full specification | `design-system.md` |
| W3C DTCG tokens | `tokens/design-tokens.json` |
| CSS custom properties | `tokens/variables.css` |
| Tailwind config | `tokens/tailwind.config.js` |
| Color system | `references/color-system.md` |
| Typography scale | `references/typography.md` |
| Elevation & depth | `references/elevation.md` |
| Component specs | `references/components.md` |
| Starter template | `templates/design-tokens-starter.json` |

## Theme Modes

- **Light Mode** (default) — enterprise apps, documentation, marketing
- **Dark Mode** — control rooms, monitoring dashboards, dark-environment UIs

Switch via `.dark` class or `[data-theme="dark"]` attribute on root element.

## Primary Colors

| Token | Light | Dark |
|-------|-------|------|
| `primary` | #005c97 | #9bcaff |
| `surface` | #f8fafb | #0f1419 |
| `on-surface` | #191c1d | #dae2fd |

## Integration

**Stitch:** Tokens include `designMd` + `namedColors` compatible format for `mcp__stitch__upload_design_md` / `mcp__stitch__create_design_system_from_design_md`

**Composable with:** `brand`, `ui-styling`, `design-system` skills

**Skill Dependencies:** None (self-contained)
