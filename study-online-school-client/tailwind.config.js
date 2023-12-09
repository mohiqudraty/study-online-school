/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        stBlack: "#0F0F0F",
        stGray: "#232D3F",
        stPrimary: "#005B41",
        stSecondary: "#008170",
        // ...
      },
    },
  },
  plugins: [require("daisyui")],
};
