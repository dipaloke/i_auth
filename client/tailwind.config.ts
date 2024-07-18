import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "custom-pattern": `
        width: 100%;
       height: 100%;
       background:
        radial-gradient(
          circle farthest-side at 0% 50%,
          #282828 23.5%,
          rgba(255, 170, 0, 0) 0
        ) 21px 30px,
        radial-gradient(
          circle farthest-side at 0% 50%,
          #2c3539 24%,
          rgba(240, 166, 17, 0) 0
        ) 19px 30px,
        linear-gradient(
          #282828 14%,
          rgba(240, 166, 17, 0) 0,
          rgba(240, 166, 17, 0) 85%,
          #282828 0
        ) 0 0,
        linear-gradient(
          150deg,
          #282828 24%,
          #2c3539 0,
          #2c3539 26%,
          rgba(240, 166, 17, 0) 0,
          rgba(240, 166, 17, 0) 74%,
          #2c3539 0,
          #2c3539 76%,
          #282828 0
        ) 0 0,
        linear-gradient(
          30deg,
          #282828 24%,
          #2c3539 0,
          #2c3539 26%,
          rgba(240, 166, 17, 0) 0,
          rgba(240, 166, 17, 0) 74%,
          #2c3539 0,
          #2c3539 76%,
          #282828 0
        ) 0 0,
        linear-gradient(90deg, #2c3539 2%, #282828 0, #282828 98%, #2c3539 0%) 0 0 #282828`,
      },
      backgroundSize: {
        "custom-size": "40px 60px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
