/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure all source files are covered
  ],
  theme: {
    extend: {}, // You can extend Tailwind here if needed
  },
  plugins: [
    require('daisyui'), // DaisyUI plugin
  ],
}
