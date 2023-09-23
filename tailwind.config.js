/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Aladin", "regular"],
      },
      colors: {
        primary: "#025239",
        primaryLight: "#E4FAEF",
        secondary: "#103A2C",
        secondaryVariant: "#7E56FB",
        greenTint: "#F3FAF8",
        purpleTint: "#EBE6FE",
      },
    },
  },
  plugins: [],
};
