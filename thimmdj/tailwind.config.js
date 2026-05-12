/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
      colors: {
        bg: {
          base: "#0a0a0a",
          surface: "#0f0f0f",
          card: "#141414",
          hover: "#1a1a1a",
        },
        text: {
          primary: "#ffffff",
          secondary: "#aaaaaa",
          muted: "#555555",
          hint: "#888888",
        },
        accent: {
          gold: "#d4b483",
        },
      },
      letterSpacing: {
        wide: "0.08em",
        wider: "0.15em",
        widest: "0.20em",
      },
      borderWidth: {
        thin: "0.5px",
      },
    },
  },
  plugins: [],
};
