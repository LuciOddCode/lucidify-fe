/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-sage": "var(--primary-sage)",
        "secondary-sage": "var(--secondary-sage)",
        "soft-lavender": "var(--soft-lavender)",
        "warm-cream": "var(--warm-cream)",
        "soft-white": "var(--soft-white)",
        "gentle-gray": "var(--gentle-gray)",
        "deep-forest": "var(--deep-forest)",
        "calm-blue": "var(--calm-blue)",
        "serene-teal": "var(--serene-teal)",
        "sunset-peach": "var(--sunset-peach)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Menlo", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
