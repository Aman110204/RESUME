/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0A0F1C",
        surface: "#101828",
        surface2: "#141D30",
        line: "#232E45",
        ink: "#E7ECF3",
        muted: "#8996AC",
        faint: "#5C6A85",
        signal: "#4ADE80",
        signal2: "#22C55E",
        wire: "#6C7CFF",
        wire2: "#8B98FF",
        amber: "#F5B94B",
        rose: "#FB7185",
      },
      fontFamily: {
        display: ["'Caveat'", "cursive"],
        mono: ["'IBM Plex Mono'", "monospace"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, #16203380 1px, transparent 1px), linear-gradient(to bottom, #16203380 1px, transparent 1px)",
      },
      keyframes: {
        blink: { "0%,49%": { opacity: 1 }, "50%,100%": { opacity: 0 } },
        rise: { from: { opacity: 0, transform: "translateY(14px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        rise: "rise 0.6s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};
