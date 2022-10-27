/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightPrimary: "#f2f2f2",
        whiteHoverColorEffect: "#ffffff6a",
      },
    },
  },
  plugins: [],
};
