/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          500: "#667eea",
          600: "#764ba2",
          900: "#1e3a8a",
        },
        main: "#3DA4FF",
        secondary: "#275AA6",
        third: "#3EECFF",
        fourth: "#3FFFB2",
        fifth: "#CED3D9",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-down": "slideDown 0.3s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
