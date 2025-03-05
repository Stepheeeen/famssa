
// filepath: /tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                famssaBlue: '#0B1D45',
                famssaYellow: '#FE9A2B',
            },
        },
    },
    plugins: [],
}