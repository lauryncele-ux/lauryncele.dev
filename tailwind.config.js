/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F6F0E6',
        ink: '#1A1A1A',
        soft: '#EDE4D6',
        coral: '#FF4D6D',
        mango: '#FFB347',
        teal: '#2EC4B6',
        violet: '#7B5EA7',
        sky: '#4BB8DB',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        punch: '6px 6px 0 0 #1A1A1A',
        soft: '0 20px 50px rgba(26,26,26,0.08)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        spinslow: 'spin 28s linear infinite',
        orbit: 'orbit 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(var(--orbit-r)) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
}
