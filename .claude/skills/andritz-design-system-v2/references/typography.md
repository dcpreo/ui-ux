# Typography — andritz-design-system-v2

## Font Family

**Inter** is the sole typeface across all roles, reinforcing industrial consistency.

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

Import: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`

## Type Scale

### Display — Hero Metrics & KPIs

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `display-lg` | 3.5rem (56px) | 700 (Bold) | 1.1 | -0.02em |
| `display-md` | 2.5rem (40px) | 700 (Bold) | 1.15 | -0.01em |
| `display-sm` | 2rem (32px) | 700 (Bold) | 1.2 | -0.01em |

Use for: dashboard KPI values, hero statistics, large data callouts.

### Headline — Structural Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `headline-lg` | 1.5rem (24px) | 600 (Semibold) | 1.3 | 0 |
| `headline-md` | 1.25rem (20px) | 600 (Semibold) | 1.4 | 0 |

Use for: page titles, major section headings.

### Title — Card & Section Labels

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `title-md` | 1rem (16px) | 600 (Semibold) | 1.4 | 0 |
| `title-sm` | 0.875rem (14px) | 600 (Semibold) | 1.4 | 0 |

Use for: card titles, sub-section headers, sidebar items.

### Body — Content Text

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `body-md` | 0.875rem (14px) | 400 (Regular) | 1.6 | 0 |
| `body-sm` | 0.75rem (12px) | 400 (Regular) | 1.5 | 0 |

Use for: paragraphs, descriptions, table cell content, captions.

### Label — Engineering Tags & Controls

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `label-lg` | 0.875rem (14px) | 500 (Medium) | 1.2 | 0.05em |
| `label-md` | 0.75rem (12px) | 500 (Medium) | 1.2 | 0.1em |
| `label-sm` | 0.625rem (10px) | 600 (Semibold) | 1.2 | 0.1em |

Use for: button labels, form labels, all-caps tags, engineering annotations.

**Labels are always uppercase** (`text-transform: uppercase`) for the engineering-label aesthetic.

## Editorial Patterns

### KPI Callout (Technical Drawing Style)

Pair `display-lg` with `label-sm` directly beneath:

```html
<div class="kpi-callout">
  <span class="display-lg">2,847</span>
  <span class="label-sm uppercase">TONS PROCESSED</span>
</div>
```

This mimics engineering technical drawing callouts — large metric with tracked all-caps unit label.

### Data Density Pattern

For high-density data cards:

```html
<span class="title-sm">450</span>
<span class="label-sm uppercase">KG/H</span>
```

### Section Header Pattern

```html
<h2 class="headline-lg">Production Overview</h2>
<p class="body-md on-surface-variant">Real-time metrics from Line 4</p>
```

## CSS Usage

```css
.display-lg {
  font-family: var(--font-family);
  font-size: var(--font-size-display-lg);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-on-surface);
}

.label-sm {
  font-family: var(--font-family);
  font-size: var(--font-size-label-sm);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-compact);
  letter-spacing: var(--letter-spacing-wider);
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
}
```

## Tailwind Usage

```html
<span class="text-display-lg text-on-surface">2,847</span>
<span class="text-label-sm text-on-surface-variant uppercase">TONS PROCESSED</span>
```

## Baseline Grid

All text should align to a 4px baseline grid. This is achieved by ensuring `line-height * font-size` produces values divisible by 4px.

| Scale | Size | Line Height | Computed | Grid-aligned |
|-------|------|-------------|----------|-------------|
| display-lg | 56px | 1.1 | 61.6px -> 64px | Use 64px |
| display-md | 40px | 1.15 | 46px -> 48px | Use 48px |
| display-sm | 32px | 1.2 | 38.4px -> 40px | Use 40px |
| headline-lg | 24px | 1.3 | 31.2px -> 32px | Use 32px |
| headline-md | 20px | 1.4 | 28px | Aligned |
| title-md | 16px | 1.4 | 22.4px -> 24px | Use 24px |
| body-md | 14px | 1.6 | 22.4px -> 24px | Use 24px |
| label-lg | 14px | 1.2 | 16.8px -> 16px | Use 16px |
| label-md | 12px | 1.2 | 14.4px -> 16px | Use 16px |
| label-sm | 10px | 1.2 | 12px | Aligned |
