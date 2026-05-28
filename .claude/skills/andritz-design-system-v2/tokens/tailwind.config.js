/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    },
    borderRadius: {
      none: '0px',
      DEFAULT: '0px',
      pill: '9999px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          container: 'var(--color-primary-container)',
          on: 'var(--color-on-primary)',
          'on-container': 'var(--color-on-primary-container)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          container: 'var(--color-secondary-container)',
          on: 'var(--color-on-secondary)',
        },
        tertiary: {
          DEFAULT: 'var(--color-tertiary)',
          container: 'var(--color-tertiary-container)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          container: 'var(--color-error-container)',
          on: 'var(--color-on-error)',
          'on-container': 'var(--color-on-error-container)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          dim: 'var(--color-surface-dim)',
          bright: 'var(--color-surface-bright)',
          'container-lowest': 'var(--color-surface-container-lowest)',
          'container-low': 'var(--color-surface-container-low)',
          container: 'var(--color-surface-container)',
          'container-high': 'var(--color-surface-container-high)',
          'container-highest': 'var(--color-surface-container-highest)',
          tint: 'var(--color-surface-tint)',
        },
        'on-surface': {
          DEFAULT: 'var(--color-on-surface)',
          variant: 'var(--color-on-surface-variant)',
        },
        outline: {
          DEFAULT: 'var(--color-outline)',
          variant: 'var(--color-outline-variant)',
        },
        inverse: {
          surface: 'var(--color-inverse-surface)',
          'on-surface': 'var(--color-inverse-on-surface)',
          primary: 'var(--color-inverse-primary)',
        },
        scrim: 'var(--color-scrim)',
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }],
        'display-sm': ['2rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        'headline-lg': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-md': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'title-md': ['1rem', { lineHeight: '1.4', fontWeight: '600' }],
        'title-sm': ['0.875rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-md': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
        'label-lg': ['0.875rem', { lineHeight: '1.2', fontWeight: '500', letterSpacing: '0.05em' }],
        'label-md': ['0.75rem', { lineHeight: '1.2', fontWeight: '500', letterSpacing: '0.1em' }],
        'label-sm': ['0.625rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '0.1em' }],
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
      },
      boxShadow: {
        ambient: 'var(--shadow-ambient)',
        'ambient-lg': 'var(--shadow-ambient-lg)',
        none: 'none',
      },
      backdropBlur: {
        frost: '20px',
      },
      maxWidth: {
        grid: '1440px',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },
      height: {
        'btn-sm': '2rem',
        'btn-md': '2.5rem',
        'btn-lg': '3rem',
      },
      width: {
        'modal-sm': '480px',
        'modal-md': '640px',
        'modal-lg': '800px',
      },
    },
  },
};
