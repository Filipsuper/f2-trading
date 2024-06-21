/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        bg: "var(--bg)",
        p: "var(--p)",
        sec: "var(--s)",
        a: "var(--a)",
        gr: "var(--gr)",
      },
    },
  },
  plugins: [],
};
