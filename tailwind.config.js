/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0e0f1c', panel: '#14102a', raised: '#161826' },
        cyber: '#00f0ff',
        hot: '#ff2bd6',
        neon: { DEFAULT: '#b84dff', soft: '#d9b3ff', glow: 'rgba(184,77,255,0.25)' },
        ink: { DEFAULT: '#e9e9ed', 100: '#e9e9ed', 200: '#cfcfd8', 300: '#a9abbb', 400: '#82859a', 700: '#3a3d52' },
        glow: '#2a1250',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 30px 80px rgba(0,0,0,.6), -8px 0 40px rgba(0,240,255,.2), 8px 0 40px rgba(255,43,214,.25)',
        logo: '0 0 22px rgba(0,240,255,.5), inset 0 0 14px rgba(255,43,214,.35)',
        panel: '0 0 80px rgba(0,240,255,.25), -6px 0 60px rgba(255,43,214,.2)',
      },
      fontSize: {
        bg: ['clamp(90px,26vw,520px)', { lineHeight: '.85', letterSpacing: '-0.05em' }],
        counter: ['clamp(90px,17vw,300px)', { lineHeight: '.8', letterSpacing: '-0.07em' }],
        title: ['clamp(22px,2vw,30px)', { letterSpacing: '-0.02em' }],
      },
      keyframes: {
        blink: { '50%': { opacity: '0' } },
        glitch: {
          '0%,100%': { transform: 'none', clipPath: 'none' },
          '20%': { transform: 'translate(-4px,2px)', clipPath: 'inset(10% 0 55% 0)' },
          '40%': { transform: 'translate(5px,-2px)', clipPath: 'inset(60% 0 8% 0)' },
          '60%': { transform: 'translate(-2px,0)', clipPath: 'inset(30% 0 40% 0)' },
          '80%': { transform: 'translate(3px,1px)', clipPath: 'none' },
        },
        scan: { from: { transform: 'translateY(-100%)' }, to: { transform: 'translateY(100vh)' } },
        flick: { '0%,100%': { opacity: '1' }, '92%': { opacity: '1' }, '93%': { opacity: '.5' }, '94%': { opacity: '1' }, '96%': { opacity: '.7' } },
        pulseDot: { '0%,100%': { opacity: '.4' }, '50%': { opacity: '1' } },
        spin: { to: { transform: 'rotate(360deg)' } },
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(8px)' } },
        drop: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
        glitch: 'glitch .5s steps(1) 1',
        scan: 'scan 7s linear infinite',
        flick: 'flick 5s infinite',
        'pulse-dot': 'pulseDot 1.6s infinite',
        'spin-slow': 'spin 18s linear infinite',
        bob: 'bob 3s ease-in-out infinite',
        drop: 'drop 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
