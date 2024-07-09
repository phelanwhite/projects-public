/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "var(--elmColor)",
      },
      screens: {
        xs: `400px`,
      },
    },
  },
  important: true,
  plugins: [],
};
