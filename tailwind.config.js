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
        darkPrimary: "#374151",
        whiteHoverColorEffect: "#ffffff6a",
        darkHoverColorEffect: "#22222256",
      },
      transitionTimingFunction: {
        cubicBazierCustom: "cubic-bezier(.22,-0.62,.73,1.62)",
      },
      borderRadius: {
        connection: "0% 100% 0% 100% / 42% 0% 100% 58% ",
      },
    },
  },
  plugins: [],
};
