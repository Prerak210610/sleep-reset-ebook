import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        chocolate: {
          DEFAULT: "#3D1F0F",
          deep: "#1A0A00",
          warm: "#5A3320"
        },
        creme: {
          DEFAULT: "#FDF8F0",
          soft: "#FAF6EF",
          warm: "#F5ECD7"
        },
        gold: {
          DEFAULT: "#C8892A",
          light: "#E5B25C",
          deep: "#9C6A1F"
        },
        // Forest aliases now point to chocolate values per brand revision.
        // Palette is Cream + Chocolate Brown + Gold only.
        forest: {
          DEFAULT: "#3D1F0F",
          deep: "#1A0A00",
          dark: "#0F0500"
        }
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
        accent: ["var(--font-playfair)", "Playfair Display", "serif"]
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 5.5vw, 4.5rem)", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.15", letterSpacing: "-0.005em" }]
      },
      letterSpacing: {
        widest: "0.25em"
      },
      lineHeight: {
        prose: "1.8"
      },
      keyframes: {
        levitate: {
          "0%, 100%": { transform: "translateY(-8px)" },
          "50%": { transform: "translateY(8px)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "wipe-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" }
        }
      },
      animation: {
        levitate: "levitate 4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
        "wipe-line": "wipe-line 1.2s ease-out forwards"
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")"
      }
    }
  },
  plugins: []
};

export default config;
