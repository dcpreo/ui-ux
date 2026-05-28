# Elevation & Depth — andritz-design-system-v2

## Philosophy

Depth is communicated through **tonal layering**, not traditional drop shadows. The system treats UI surfaces as machined metal plates at varying heights — higher surfaces are lighter (in Light Mode) or darker (in Dark Mode). Shadows are reserved exclusively for floating elements.

## Elevation Levels

| Level | Purpose | Light Surface | Dark Surface | Shadow |
|-------|---------|--------------|-------------|--------|
| 0 | Base floor | `surface` (#f8fafb) | `surface` (#0f1419) | None |
| 1 | Content regions | `surface-container-low` (#f2f4f5) | `surface-container-low` (#141b28) | None |
| 2 | Interactive cards | `surface-container-lowest` (#ffffff) | `surface-container-lowest` (#0a0f18) | None |
| 3 | Emphasized zones | `surface-container-high` (#e6e8e9) | `surface-container-high` (#242c3d) | None |
| 4 | Floating (dropdown, tooltip) | `surface-container-lowest` (#ffffff) | `surface-container-low` (#141b28) | Ambient |
| 5 | Modal overlay | `surface-container-lowest` (#ffffff) | `surface-container-lowest` (#0a0f18) | Ambient + Scrim |

## Ambient Shadow

Floating elements (Level 4-5) use atmospheric shadows instead of traditional drop shadows:

### Light Mode

```css
/* Level 4 — dropdown, tooltip */
box-shadow: 0 8px 32px rgb(25 28 29 / 0.06);

/* Level 5 — modal */
box-shadow: 0 16px 64px rgb(25 28 29 / 0.06);
```

### Dark Mode

```css
/* Level 4 — dropdown, tooltip */
box-shadow: 0 12px 48px rgb(10 15 24 / 0.04);

/* Level 5 — modal */
box-shadow: 0 24px 80px rgb(10 15 24 / 0.04);
```

Key differences in Dark Mode:
- Reduced opacity: 4% vs 6%
- Increased blur: 48-80px vs 32-64px

## Scrim

Used behind Level 5 (modal) overlays:

```css
/* Light Mode */
.scrim { background: rgb(25 28 29 / 0.3); }

/* Dark Mode */
.scrim { background: rgb(15 20 25 / 0.6); }
```

## Tonal Layering Examples

### Sidebar + Main Content

```
┌──────────┬──────────────────────────┐
│          │                          │
│ surface  │  surface-container-low   │
│          │                          │
│  (nav)   │     (main content)       │
│          │                          │
└──────────┴──────────────────────────┘
```

No border between them — the tonal shift provides the boundary.

### Cards on Content Region

```
┌──────────────────────────────────────┐
│  surface-container                   │
│                                      │
│  ┌────────────┐  ┌────────────┐     │
│  │ surface-   │  │ surface-   │     │
│  │ container- │  │ container- │     │
│  │ lowest     │  │ lowest     │     │
│  └────────────┘  └────────────┘     │
│                                      │
└──────────────────────────────────────┘
```

Cards "lift" via lighter tone, not shadow.

### Modal with Scrim

```
┌──────────────────────────────────────┐
│            scrim overlay             │
│                                      │
│      ┌──────────────────┐           │
│      │ surface-container │           │
│      │ -lowest           │           │
│      │                   │           │
│      │ + ambient-lg      │           │
│      │   shadow          │           │
│      └──────────────────┘           │
│                                      │
└──────────────────────────────────────┘
```

## Industrial Frost (Glass Effect)

For top navigation and floating panels:

```css
.nav-frost {
  background: rgb(var(--color-surface-container-lowest-rgb) / 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

## CSS Token Usage

```css
/* Level 0 — page base */
.page { background: var(--color-surface); }

/* Level 1 — content region */
.content { background: var(--color-surface-container-low); }

/* Level 2 — card */
.card { background: var(--color-surface-container-lowest); }

/* Level 3 — emphasized */
.emphasis { background: var(--color-surface-container-high); }

/* Level 4 — floating */
.dropdown {
  background: var(--color-surface-container-lowest);
  box-shadow: var(--shadow-ambient);
}

/* Level 5 — modal */
.modal {
  background: var(--color-surface-container-lowest);
  box-shadow: var(--shadow-ambient-lg);
}
.modal-scrim {
  background: var(--color-scrim);
}
```

## Rules

1. **Levels 0-3:** Tonal layering only. No shadows allowed.
2. **Levels 4-5:** Ambient shadow required. No hard drop shadows.
3. **No dated shadows:** Never use `0 2px 4px rgba(0,0,0,0.2)` style shadows.
4. **Ghost border** at 15% opacity only when accessibility demands a visible edge — not as a design choice.
5. **No-Line Rule applies** — tonal boundaries replace all 1px dividers.
