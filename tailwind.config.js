/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
    theme: {
      extend: {
        colors: {
          dark: {
            bg: "#000000",
            card: "#1C1C1C",
            text: "#FFFFFF",
            textMuted: "#A0A0A0",
            border: "#333333",
          },
        },
      },
    },    
  }
  