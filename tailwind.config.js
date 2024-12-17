/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/theme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./node_modules/@nextui-org/theme/dist/components/(spinner|input|button).js",
    // "./node_modules/@nextui-org/theme/dist/components/select.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screen: {
      md: { min: "768px", max: "1024px" },
      lg: { min: "1025px" },
    },
  },
  plugins: [nextui()],
};
