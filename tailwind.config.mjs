/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ff4d4d',
          DEFAULT: '#ff1a1a',
          dark: '#e60000',
        },
        background: '#ffffff',
        foreground: '#171717',
      },
    },
  },
  plugins: [],
};

export default config;
