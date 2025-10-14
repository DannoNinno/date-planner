import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        '100%': '100%',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-bg': '#004f45',
        'inst-text': '#003a34',
        'main-footer': '#d8ddd9'
      },
      backgroundImage: {
        'fondo-ensayo': "url('/images/fondo-inicio.jpg')",
        'sello-cftst': "url('/images/logo-cft-ep.png')",
        'sello-ipst': "url('/images/logo-ip-ep.png')",
        'sello-ust': "url('/images/logo-ust-ep.png')",
        'fondo-ensayo-generico': "url('/images/bg-oficial-paes.png')",
        'state-ok': "url('/images/icons8-approved-50.png')",
        'state-warning': "url('/images/icons8-warning-30.png')",
        'state-wrong': "url('/images/icons8-fire-warning-64.png')"
      },
      fontFamily: {
        'roboto-condensed': ['Roboto-C', 'sans-serif'],
      },
      fontSize: {
        'tiny': '0.65rem',
        'extra-tiny': '0.5rem',
      },
      maxWidth: {
        'custom': 'calc(40rem + 20px)', // Ajusta este valor según tus necesidades
      },
    },
  },
  plugins: [],
} satisfies Config;
