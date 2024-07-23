/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

