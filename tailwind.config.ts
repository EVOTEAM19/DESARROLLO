import type { Config } from 'tailwindcss'

// ============================================================
//  FastIA · Tema "Apple Light"
//  Blanco, grises Apple (#f5f5f7), texto #1d1d1f, acento azul #0071e3.
//  Minimalista, limpísimo, mucho aire.
//  Remapeamos indigo/violet/orange → azul Apple para que el código existente
//  adopte el acento sin tocar cada clase.
// ============================================================

const blue = {
  50: '#f0f7ff',
  100: '#e0efff',
  200: '#b9dcff',
  300: '#7cc0ff',
  400: '#3aa0ff',
  500: '#0071e3', // Apple blue
  600: '#0062c4',
  700: '#0052a3',
  800: '#004485',
  900: '#003a70',
  950: '#00264d',
}

// Grises Apple
const gray = {
  50: '#fbfbfd',
  100: '#f5f5f7',
  200: '#e8e8ed',
  300: '#d2d2d7',
  400: '#aeaeb2',
  500: '#86868b',
  600: '#6e6e73',
  700: '#4b4b4f',
  800: '#2d2d2f',
  900: '#1d1d1f',
  950: '#0a0a0a',
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          secondary: 'var(--background-secondary)',
          tertiary: 'var(--background-tertiary)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          secondary: 'var(--foreground-secondary)',
          muted: 'var(--foreground-muted)',
        },
        brand: {
          primary: '#0071e3',
          secondary: '#0077ed',
          dark: '#0062c4',
          light: '#3aa0ff',
          hover: '#0077ed',
        },
        fastia: {
          orange: '#0071e3',
          'orange-hover': '#0077ed',
          'orange-dark': '#0062c4',
          'dark-gray': '#1d1d1f',
          'medium-gray': '#f5f5f7',
          'light-gray': '#e8e8ed',
          'text-gray': '#1d1d1f',
        },
        // Acento azul (mantiene claves heredadas)
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
          dark: 'var(--accent-dark)',
          orange: blue,
          indigo: blue,
          violet: blue,
        },
        // Remapeos → azul Apple
        orange: blue,
        indigo: blue,
        violet: blue,
        blue,
        gray,
        success: { DEFAULT: '#34c759', light: '#30d158', dark: '#248a3d' },
        warning: { DEFAULT: '#ff9f0a', light: '#ffb340', dark: '#c77400' },
        error: { DEFAULT: '#ff3b30', light: '#ff6961', dark: '#d70015' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.05' }],
        '6xl': ['3.75rem', { lineHeight: '1.03' }],
        '7xl': ['4.5rem', { lineHeight: '1.0' }],
        '8xl': ['6rem', { lineHeight: '1.0' }],
        '9xl': ['8rem', { lineHeight: '1.0' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      spacing: { '18': '4.5rem', '88': '22rem', '128': '32rem' },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #0071e3 0%, #3aa0ff 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #0077ed 0%, #0062c4 100%)',
        'gradient-accent': 'linear-gradient(135deg, #0071e3 0%, #7cc0ff 100%)',
        'gradient-dark': 'linear-gradient(180deg, var(--background) 0%, var(--background-secondary) 100%)',
        'gradient-mesh':
          'radial-gradient(at 0% 0%, rgba(0,113,227,0.08) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(58,160,255,0.07) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(0,113,227,0.06) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(124,192,255,0.06) 0px, transparent 50%)',
        'grid-blue':
          'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
      },
      boxShadow: {
        'glow-sm': '0 2px 12px -4px rgba(0,113,227,0.35)',
        'glow-md': '0 8px 24px -8px rgba(0,113,227,0.35)',
        'glow-lg': '0 16px 40px -12px rgba(0,113,227,0.4)',
        'glow-orange': '0 8px 24px -8px rgba(0,113,227,0.35)',
        'glow-indigo': '0 10px 30px -10px rgba(0,113,227,0.4)',
        'glow-violet': '0 10px 30px -10px rgba(0,113,227,0.4)',
        'soft': '0 4px 24px rgba(0,0,0,0.06)',
        'card': '0 1px 2px rgba(0,0,0,0.04), 0 12px 32px -16px rgba(0,0,0,0.18)',
        'card-hover': '0 2px 4px rgba(0,0,0,0.05), 0 24px 48px -20px rgba(0,0,0,0.22)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'scale-out': 'scaleOut 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 12s ease-in-out infinite',
        'float-slow': 'floatSlow 16s ease-in-out infinite',
        'shimmer': 'shimmer 2.4s linear infinite',
        'scroll': 'scroll 28s linear infinite',
        'marquee': 'marquee 38s linear infinite',
        'aurora': 'aurora 18s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeOut: { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(-40px) translateX(16px)', opacity: '0.8' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translate3d(3%, -2%, 0) scale(1.1)', opacity: '0.8' },
        },
      },
      backdropBlur: { xs: '2px' },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'apple': 'cubic-bezier(0.28, 0.11, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
export default config
