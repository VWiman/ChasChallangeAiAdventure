/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgcolor: '#1C1917', 
        bgheader: '#0E0D0B',
        primary: '#C66C06',
        accent: '#9a5200',
        textcolor: '#F4F2F1',
        darktext: '#0E0D0B',
        btnhovertext: '#F4F2F1',
        cardbg: '#38332E',
        formbg: '#554C44',
        browngray: "#bbb2aa"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
