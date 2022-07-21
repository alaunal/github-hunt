module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      display: ["Poppins"],
      heading: ["Poppins"],
      body: ["Poppins"],
    },
    container: {
      center: true,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
