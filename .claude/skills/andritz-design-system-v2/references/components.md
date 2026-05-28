# Component Specifications — andritz-design-system-v2

## Global Rules

All components share these non-negotiable rules:

1. **Border radius: 0px** (exception: chips/tags use 9999px)
2. **No 1px dividers** — use tonal shifts or whitespace
3. **No pure black** — use `on-surface` token
4. **Font family:** Inter only

---

## Buttons

### Variants

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Primary | Gradient `primary` -> `primary-container` @135deg | `on-primary` | None |
| Secondary | `surface-container-high` | `on-surface` | None |
| Tertiary | Transparent | `surface-tint` | None (2px bottom underline on hover) |
| Destructive | `error` | `on-error` | None |
| Ghost | Transparent | `on-surface` | `outline-variant` at 15% opacity |

### Sizes

| Size | Height | Padding X | Font |
|------|--------|-----------|------|
| `sm` | 32px (2rem) | 16px | `label-lg` |
| `md` | 40px (2.5rem) | 24px | `label-lg` |
| `lg` | 48px (3rem) | 24px | `label-lg` |

### States

| State | Effect |
|-------|--------|
| Hover | Gradient shift (not simple darken) |
| Active | Scale 0.98, slight gradient intensify |
| Focus | 2px outline `primary` with 2px offset |
| Disabled | 40% opacity, no pointer events |

### CSS Example

```css
.btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-container));
  color: var(--color-on-primary);
  border: none;
  border-radius: var(--radius-none);
  height: var(--button-height-md);
  padding: 0 var(--button-padding-x);
  font-family: var(--font-family);
  font-size: var(--button-font-size);
  font-weight: var(--button-font-weight);
  letter-spacing: var(--button-letter-spacing);
  text-transform: uppercase;
  cursor: pointer;
  transition: all var(--duration-normal) ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--color-primary-container), var(--color-primary));
}
```

---

## Input Fields

### Rest State

```css
.input {
  background: var(--color-surface-container-highest);
  color: var(--color-on-surface);
  border: none;
  border-bottom: 2px solid transparent;
  border-radius: var(--radius-none);
  padding: var(--input-padding-y) var(--input-padding-x);
  font-family: var(--font-family);
  font-size: var(--font-size-body-md);
}
```

### States

| State | Style |
|-------|-------|
| Rest | Fill only, no border |
| Focus | 2px solid `primary` bottom-border (ledger style) |
| Error | Background `error-container`, text `on-error-container` |
| Disabled | 40% opacity, no interaction |

### Focus

```css
.input:focus {
  border-bottom: 2px solid var(--color-primary);
  outline: none;
}
```

### Error

```css
.input-error {
  background: var(--color-error-container);
  color: var(--color-on-error-container);
}
```

---

## Cards

### Structure

```css
.card {
  background: var(--color-surface-container-lowest);
  border-radius: var(--radius-none);
  padding: var(--card-padding);
}
```

### Rules

- **Background:** `surface-container-lowest` (lifts against `surface-container`)
- **Border:** None by default
- **Ghost border:** Only when accessibility requires it, at 15% opacity
- **Dividers inside cards:** Forbidden — use 32px whitespace or tonal sub-zones
- **Data density:** `title-sm` for primary values, `label-sm` for units

### Accessibility Ghost Border

```css
.card-bordered {
  outline: 1px solid rgb(var(--color-outline-variant-rgb) / 0.15);
}
```

---

## Tables

### Structure

```css
.table-header {
  background: var(--color-surface-container-high);
  font-size: var(--font-size-label-md);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-wider);
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
}

.table-row:nth-child(even) {
  background: var(--color-surface-container-lowest);
}

.table-row:nth-child(odd) {
  background: var(--color-surface-container-low);
}

.table-row:hover {
  background: var(--color-surface-container);
}
```

### Rules

- **No borders** between rows or columns — tonal alternation provides separation
- **Header:** `label-md` all-caps, `surface-container-high` background
- **Hover:** Shift to `surface-container` tint

---

## Navigation

### Top Navigation

```css
.nav-top {
  background: rgb(var(--color-surface-container-rgb) / var(--nav-backdrop-opacity));
  backdrop-filter: blur(var(--nav-backdrop-blur));
  -webkit-backdrop-filter: blur(var(--nav-backdrop-blur));
}

.nav-item-active {
  border-bottom: 2px solid var(--color-primary);
}
```

### Side Navigation

```css
.nav-side {
  background: var(--color-surface-container-low);
}

.nav-side-item-active {
  background: var(--color-primary-container);
  color: var(--color-on-primary-container);
}
```

---

## Badges / Chips

The **only exception** to the 0px radius rule.

```css
.chip {
  border-radius: var(--chip-radius); /* 9999px */
  font-size: var(--chip-font-size);
  font-weight: var(--chip-font-weight);
  letter-spacing: var(--chip-letter-spacing);
  text-transform: uppercase;
  padding: var(--chip-padding-y) var(--chip-padding-x);
  background: transparent;
}
```

### Status Variants

| Status | Border Color | Text Color |
|--------|-------------|------------|
| Success | `tertiary` | `tertiary` |
| Warning | `tertiary-container` | `tertiary-container` |
| Critical | `error` | `error` |

```css
.chip-success {
  border: 1px solid var(--color-tertiary);
  color: var(--color-tertiary);
}

.chip-warning {
  border: 1px solid var(--color-tertiary-container);
  color: var(--color-tertiary-container);
}

.chip-critical {
  border: 1px solid var(--color-error);
  color: var(--color-error);
}
```

---

## Modals

```css
.modal {
  background: var(--color-surface-container-lowest);
  box-shadow: var(--shadow-ambient-lg);
  border-radius: var(--radius-none);
}

.modal-sm { width: 480px; }
.modal-md { width: 640px; }
.modal-lg { width: 800px; }

.modal-scrim {
  position: fixed;
  inset: 0;
  background: var(--color-scrim);
}
```

---

## Layout Grid

```css
.grid-container {
  display: grid;
  max-width: var(--grid-max-width);
  margin: 0 auto;
  padding: 0 var(--grid-gutter);
  gap: var(--grid-gutter);
}

/* Desktop: 12 columns */
@media (min-width: 1024px) {
  .grid-container { grid-template-columns: repeat(12, 1fr); }
}

/* Tablet: 8 columns */
@media (min-width: 600px) and (max-width: 1023px) {
  .grid-container { grid-template-columns: repeat(8, 1fr); }
}

/* Mobile: 4 columns */
@media (max-width: 599px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
    padding: 0 var(--grid-margin-mobile);
  }
}
```
