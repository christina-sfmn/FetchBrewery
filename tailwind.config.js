/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: { // hier können die Standardwerte von Tailwind um eigene erweitert werden (z. B. eigene Farben, Screengrößen, Abstände, etc.)
      colors: {
      myColor: "#bc2bc7",
      }
    },
  },
  plugins: [],
}

