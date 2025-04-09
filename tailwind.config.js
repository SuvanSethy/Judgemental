/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'curse-red': 'var(--curse-red)',
        'curse-blue': 'var(--curse-blue)',
        'curse-purple': 'var(--curse-purple)',
        'curse-green': 'var(--curse-green)',
        'curse-yellow': 'var(--curse-yellow)',
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'border-primary': 'var(--border-primary)',
        'border-secondary': 'var(--border-secondary)',
        'border': 'hsl(var(--border))',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        metal: ['Metal', 'Metal Mania', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'circuit-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow': '0 0 20px var(--shadow-glow)',
        'glow-lg': '0 0 30px var(--shadow-glow)',
      },
      animation: {
        'scan': 'scan 2s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 20px var(--shadow-glow)' },
          '50%': { opacity: '1', boxShadow: '0 0 30px var(--shadow-glow)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
} 