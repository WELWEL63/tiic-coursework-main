/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Optional: short aliases matching your AR theme
        brand: {
          blue: "#2563EB",      // primary
          blueSoft: "#38BDF8",  // accent
          dark: "#020617",      // near-black
        },
      },
      boxShadow: {
        "brand-soft": "0 10px 25px rgba(37, 99, 235, 0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
