/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3536FF",
        secondary: "#E6E6FF80",
        sub_title: "#757575",
        text: "#333333",
      },
    },
  },
  plugins: [],
};
