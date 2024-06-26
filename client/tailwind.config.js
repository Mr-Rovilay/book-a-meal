/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
  ],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#242424",
      "dark-grey": "#6B6B6B",
      red: "#FF4E4E",
      transparent: "transparent",

      grey: "#F3F3F3",

      twitter: "#1DA1F2",
      purple: "#8B46FF",
      yellow: "#F1EF99",

      primary: "#B784B7",
      "dark-green": "#2dfe54",
      green: "#7cfc00",

      prigmayBG: "#FCFCFC",
    },

    fontSize: {
      sm: "12px",
      base: "14px",
      xl: "16px",
      "2xl": "20px",
      "3xl": "28px",
      "4xl": "38px",
      "5xl": "50px",
    },

    extend: {
      fontFamily: {
        inter: ["'Inter'", "sans-serif"],
        gelasio: ["'Gelasio'", "serif"],
        cursive: ["Ephesis", "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
