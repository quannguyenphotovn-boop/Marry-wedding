import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#fffdf8",
          100: "#fdf8ee",
          200: "#f9f0dc",
          300: "#f2e4c4",
          DEFAULT: "#fdf8ee",
        },
        charcoal: {
          50: "#f4f4f3",
          100: "#e3e2e0",
          300: "#9b9894",
          500: "#54504a",
          700: "#2e2b27",
          900: "#1a1815",
          DEFAULT: "#1a1815",
        },
        gold: {
          50: "#fbf6e9",
          100: "#f3e6bf",
          200: "#e8d08a",
          300: "#d9b85c",
          400: "#c9a227",
          500: "#b08d1f",
          600: "#8c701a",
          DEFAULT: "#c9a227",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "Helvetica", "Arial", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        luxury: "0 20px 60px -15px rgba(26, 24, 21, 0.25)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
