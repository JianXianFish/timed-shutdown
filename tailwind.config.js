/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 1s infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "float-slow": "float 4s ease-in-out infinite",
        "pulse-gentle": "pulse 3s ease-in-out infinite",
        "rotate-slow": "rotate 20s linear infinite",
        "scale-gentle": "scale 4s ease-in-out infinite",
        "breathing-light-green": "breathingLightGreen 2s ease-in-out infinite",
        "breathing-glow-green": "breathingGlowGreen 2s ease-in-out infinite",
        "breathing-light-yellow":
          "breathingLightYellow 2s ease-in-out infinite",
        "breathing-glow-yellow": "breathingGlowYellow 2s ease-in-out infinite",
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
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        breathingLightGreen: {
          "0%, 100%": {
            opacity: "0.4",
            transform: "scale(1)",
            boxShadow:
              "0 0 2px rgb(34 197 94), 0 0 4px rgb(34 197 94), 0 0 6px rgb(34 197 94)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
            boxShadow:
              "0 0 3px rgb(34 197 94), 0 0 6px rgb(34 197 94), 0 0 9px rgb(34 197 94)",
          },
        },
        breathingGlowGreen: {
          "0%, 100%": {
            opacity: "0.2",
            transform: "scale(1)",
            filter: "blur(0.3px)",
            boxShadow:
              "0 0 3px rgb(34 197 94), 0 0 6px rgb(34 197 94), 0 0 9px rgb(34 197 94)",
          },
          "50%": {
            opacity: "0.6",
            transform: "scale(1.1)",
            filter: "blur(0.2px)",
            boxShadow:
              "0 0 4px rgb(34 197 94), 0 0 8px rgb(34 197 94), 0 0 12px rgb(34 197 94)",
          },
        },
        breathingLightYellow: {
          "0%, 100%": {
            opacity: "0.4",
            transform: "scale(1)",
            boxShadow:
              "0 0 2px rgb(234 179 8), 0 0 4px rgb(234 179 8), 0 0 6px rgb(234 179 8)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
            boxShadow:
              "0 0 3px rgb(234 179 8), 0 0 6px rgb(234 179 8), 0 0 9px rgb(234 179 8)",
          },
        },
        breathingGlowYellow: {
          "0%, 100%": {
            opacity: "0.2",
            transform: "scale(1)",
            filter: "blur(0.3px)",
            boxShadow:
              "0 0 3px rgb(234 179 8), 0 0 6px rgb(234 179 8), 0 0 9px rgb(234 179 8)",
          },
          "50%": {
            opacity: "0.6",
            transform: "scale(1.1)",
            filter: "blur(0.2px)",
            boxShadow:
              "0 0 4px rgb(234 179 8), 0 0 8px rgb(234 179 8), 0 0 12px rgb(234 179 8)",
          },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
