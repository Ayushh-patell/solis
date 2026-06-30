/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: "#EEA243",
        success: "#618B4A",
        accent: "#C3F73A",

        // Backgrounds
        background: "#191516",
        surface: "#242021",
        surfaceLight: "#2E2A2B",

        // Text
        text: "#FFFFFF",
        textSecondary: "#B5B0B1",
        textMuted: "#7A7475",

        // UI
        border: "#383334",
        divider: "#2B2728",

        // Status
        danger: "#E53935",
        warning: "#F59E0B",
        info: "#3B82F6",

        // Utility
        white: "#FFFFFF",
        black: "#000000",
        transparent: "transparent",
      },

      spacing: {
        screen: "20px",
      },

      borderRadius: {
        card: "20px",
        button: "16px",
        sheet: "28px",
      },
    },
  },
  plugins: [],
};