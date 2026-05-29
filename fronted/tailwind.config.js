/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        primary: "#2563EB",
        secondary: "#0F172A",
        accent: "#06B6D4",
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
      },

      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
      },

      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },

          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },

    },
  },

  plugins: [],
};