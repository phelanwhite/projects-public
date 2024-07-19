/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio:{
        thumbnail: `9 / 14`
      }
    },
  },
  important:true,
  plugins: [],
}