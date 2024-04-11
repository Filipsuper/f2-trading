/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        background: "var(--bg)",
        primary: "var(--p)",
        secondary: "var(--s)",
        accent: "var(--a)",
      },
    },
  },
  plugins: [],
};
