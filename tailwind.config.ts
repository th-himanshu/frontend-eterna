import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        axiom: {
          bg: "#050505",
          card: "#0a0a0a",
          border: "#1a1a1a",
          text: {
            main: "#e2e8f0",
            dim: "#64748b",
            highlight: "#f8fafc",
          },
          green: "#22c55e",
          red: "#ef4444",
          accent: "#6366f1", // Indigo-ish
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
