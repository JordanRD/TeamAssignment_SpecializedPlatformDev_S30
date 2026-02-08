/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#075F47",
        hoverbutton: "#043d2e",
        textMain: "#233D4D",
        accent: "#FE7F2D",
      },
    },
  },
  plugins: [],
};
