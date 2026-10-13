import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
      },
      colors: {
        ink: "#0c0d10",
        "ink-card": "#13151b",
        "ink-border": "#212530",
        lime: "#c6f432",
        "lime-hover": "#d8f856",
        mist: "#f4f5f1",
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(198, 244, 50, 0.25)",
        glass: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
