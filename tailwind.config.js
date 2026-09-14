/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0b1f3a",
          50: "#eef3f9",
          100: "#d6e0ee",
          200: "#a9bfd9",
          300: "#6f92bb",
          400: "#3f6a9a",
          500: "#1f4a78",
          600: "#153a61",
          700: "#102b4c",
          800: "#0b1f3a",
          900: "#07152a",
          950: "#040c1a",
        },
        gold: {
          DEFAULT: "#cf7046",
          light: "#e39a74",
          dark: "#9a4a2a",
        },
        cream: "#f7f3ea",
        ink: "#172033",
      },
      fontFamily: {
        display: ["Syne", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(3deg)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(40px, -60px) scale(1.15)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.9)" },
        },
        shine: {
          "0%": { transform: "translateX(-150%) skewX(-20deg)" },
          "100%": { transform: "translateX(250%) skewX(-20deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(18px)", opacity: "0" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        blob: "blob 18s ease-in-out infinite",
        shine: "shine 1.4s ease-in-out",
        "spin-slow": "spin-slow 24s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.2, 0.6, 0.3, 1) infinite",
        blink: "blink 1s step-end infinite",
        "scroll-dot": "scroll-dot 1.6s ease-in-out infinite",
        gradient: "gradient 8s ease infinite",
      },
      boxShadow: {
        glow: "0 0 40px rgba(207, 112, 70, 0.35)",
        "glow-sm": "0 0 18px rgba(207, 112, 70, 0.3)",
        card: "0 20px 60px -20px rgba(11, 31, 58, 0.35)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #e39a74 0%, #cf7046 50%, #a8522f 100%)",
        "navy-gradient": "linear-gradient(160deg, #102b4c 0%, #0b1f3a 55%, #040c1a 100%)",
      },
    },
  },
  plugins: [],
};
