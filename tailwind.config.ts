import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1F4E5F",
          light: "#EAF2F4",
        },
        change: {
          up: "#15803D",
          down: "#B91C1C",
        },
      },
    },
  },
  plugins: [],
};

export default config;
