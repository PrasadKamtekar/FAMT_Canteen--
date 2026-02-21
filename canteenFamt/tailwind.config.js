/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "600px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        darkGreen: "#0F6657",
        tealGreen: "#00AD8F",
        orange: "#FBA808",
        lightPink: "#EF8E91",
        darkBlack: "#01000D",
      },
    },
  },
  plugins: [],
}