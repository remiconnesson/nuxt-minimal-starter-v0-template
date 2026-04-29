import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        border: 'var(--border)',
        ring: 'var(--ring)',
        error: 'var(--error)',
        success: 'var(--success)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
    },
  },
} satisfies Config
