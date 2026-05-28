# Color System — andritz-design-system-v2

## Heritage

The primary color `#005c97` (Andritz Blue) is derived from the corporate brand identity. The full palette is built using Material Design 3 tonal layering, extracted and validated against Stitch project `1967458271320908542` (The Monolithic Engine).

## Three-Layer Color Architecture

```
Primitive (raw hex values)
       |
Semantic (purpose-mapped, per-theme)
       |
Component (per-component color assignments)
```

## Primary Palette

### Light Mode

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | #005c97 | Brand touchpoints, primary CTA |
| `primary-container` | #0075be | CTA gradient endpoint, containers |
| `on-primary` | #ffffff | Text/icons on primary |
| `on-primary-container` | #f3f7ff | Text on primary container |

### Dark Mode

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | #9bcaff | Brand touchpoints, primary CTA |
| `primary-container` | #004b93 | CTA gradient endpoint, containers |
| `on-primary` | #003062 | Text/icons on primary |
| `on-primary-container` | #96bdff | Text on primary container |

## Secondary & Tertiary

| Token | Light | Dark | Role |
|-------|-------|------|------|
| `secondary` | #49607f | #b0c8ec | Supporting UI, secondary actions |
| `secondary-container` | #c1d9fd | #314866 | Secondary container fills |
| `tertiary` | #4b5a69 | #b8c8da | Slate accents, neutral emphasis |
| `tertiary-container` | #637383 | #39485c | Tertiary containers |

## Error States

| Token | Light | Dark |
|-------|-------|------|
| `error` | #ba1a1a | #ffb4ab |
| `error-container` | #ffdad6 | #93000a |
| `on-error` | #ffffff | #690005 |
| `on-error-container` | #410002 | #ffdad6 |

## Surface Hierarchy (Tonal Layering)

Surfaces function as "machined plates" — hierarchy comes from tonal differentiation, never from borders.

### Light Mode Surfaces

```
Lowest   #ffffff  ████████  Elevated cards, white lift
Low      #f2f4f5  ████████  Secondary plates
Default  #eceeef  ████████  Primary content regions
High     #e6e8e9  ████████  Emphasized zones, table headers
Highest  #e1e3e4  ████████  Input fills
Base     #f8fafb  ████████  Page background
Dim      #d8dadb  ████████  Dimmed variant
```

### Dark Mode Surfaces

```
Lowest   #0a0f18  ████████  Elevated cards
Low      #141b28  ████████  Secondary plates
Default  #1a2130  ████████  Primary content regions
High     #242c3d  ████████  Emphasized zones, table headers
Highest  #2d3449  ████████  Input fills
Base     #0f1419  ████████  Page background
Bright   #31394d  ████████  Bright accent
```

### Surface Usage Map

| Layout Element | Surface Token |
|---------------|--------------|
| Page background | `surface` |
| Sidebar | `surface` or `surface-container-low` |
| Main content | `surface-container` |
| Card on content | `surface-container-lowest` |
| Table header | `surface-container-high` |
| Input field fill | `surface-container-highest` |
| Modal / dropdown | `surface-container-lowest` |

## Text Colors

| Role | Light | Dark | Token |
|------|-------|------|-------|
| Primary text | #191c1d | #dae2fd | `on-surface` |
| Secondary text | #404751 | #c2c6d2 | `on-surface-variant` |

**Rule:** Never use pure `#000000`. Always use `on-surface` for text.

## Utility Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `outline` | #707882 | #8c919c | Prominent borders (rare) |
| `outline-variant` | #c0c7d2 | #424751 | Ghost borders at 15% opacity |
| `inverse-surface` | #2e3132 | #dae2fd | Snackbars, tooltips |
| `inverse-on-surface` | #eff1f2 | #283044 | Text on inverse surface |
| `inverse-primary` | #9bcaff | #005c97 | Primary on inverse surface |
| `surface-tint` | #0062a0 | #9bcaff | Tint overlay |

## Ghost Border Rule

When accessibility requires a visible edge:

```css
border: 1px solid rgb(var(--color-outline-variant-rgb) / 0.15);
```

The border should be "felt, not seen" — never use full-opacity borders.

## CTA Gradient

Primary buttons use a subtle gradient:

```css
background: linear-gradient(135deg, var(--color-primary), var(--color-primary-container));
```

Light: `#005c97` -> `#0075be` at 135deg
Dark: `#9bcaff` -> `#004b93` at 135deg

## Scrim

| Mode | Value |
|------|-------|
| Light | `rgb(25 28 29 / 0.3)` |
| Dark | `rgb(15 20 25 / 0.6)` |

## Status Colors (for Chips)

| Status | Color Token | Usage |
|--------|------------|-------|
| Success | `tertiary` | Operational, running, healthy |
| Warning | `tertiary-container` | Needs attention, degraded |
| Critical | `error` | Failed, error, stopped |

## Stitch Integration

### namedColors Format (Light)

```json
{
  "Primary": "#005c97",
  "Primary Container": "#0075be",
  "On Primary": "#ffffff",
  "Secondary": "#49607f",
  "Surface": "#f8fafb",
  "Surface Container": "#eceeef",
  "Surface Container Lowest": "#ffffff",
  "Surface Container Low": "#f2f4f5",
  "Surface Container High": "#e6e8e9",
  "Surface Container Highest": "#e1e3e4",
  "On Surface": "#191c1d",
  "On Surface Variant": "#404751",
  "Outline": "#707882",
  "Outline Variant": "#c0c7d2",
  "Error": "#ba1a1a",
  "Error Container": "#ffdad6"
}
```

### namedColors Format (Dark)

```json
{
  "Primary": "#9bcaff",
  "Primary Container": "#004b93",
  "On Primary": "#003062",
  "Secondary": "#b0c8ec",
  "Surface": "#0f1419",
  "Surface Container": "#1a2130",
  "Surface Container Lowest": "#0a0f18",
  "Surface Container Low": "#141b28",
  "Surface Container High": "#242c3d",
  "Surface Container Highest": "#2d3449",
  "On Surface": "#dae2fd",
  "On Surface Variant": "#c2c6d2",
  "Outline": "#8c919c",
  "Outline Variant": "#424751",
  "Error": "#ffb4ab",
  "Error Container": "#93000a"
}
```
