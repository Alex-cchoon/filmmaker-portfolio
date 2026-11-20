import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette — change these to restyle the whole site
        ink: "#0d0c0b", // page background
        panel: "#12100e", // case study panel
        band: "#171513", // about section
        cream: "#efe3c8", // main text
        "cream-2": "#ddd2b8", // body text
        "cream-3": "#cfc4ab", // client lines
        "muted-2": "#b3a993", // small labels
        gold: "#d4a85a", // accent
        line: "#2e2a25", // dividers
        "line-2": "#5a5247", // pill borders
        // used by the video modal
        foreground: "#efe3c8",
        muted: "#b3a993",
        accent: "#d4a85a",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        display: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
