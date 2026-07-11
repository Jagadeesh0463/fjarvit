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
          50: "#EAF2F4",
          100: "#D3E4E8",
          200: "#A7C9D1",
          300: "#6FA3AF",
          400: "#3D7C8F",
          500: "#1F4E5F",
          600: "#193F4D",
          700: "#15323D",
          800: "#102631",
          900: "#0D1F26",
          DEFAULT: "#1F4E5F",
          light: "#EAF2F4",
        },
        accent: {
          50: "#FBF3E3",
          100: "#F5E4C0",
          300: "#E8C685",
          400: "#DBAD5B",
          500: "#C9972F",
          600: "#A97A1F",
          700: "#7F5C18",
          DEFAULT: "#C9972F",
        },
        cream: "#FAF8F4",
        change: {
          up: "#15803D",
          down: "#B91C1C",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "ui-sans-serif",
          '"Helvetica Neue"',
          "Arial",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(13, 31, 38, 0.04), 0 4px 16px rgba(13, 31, 38, 0.06)",
        "card-hover": "0 2px 4px rgba(13, 31, 38, 0.06), 0 12px 28px rgba(13, 31, 38, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
