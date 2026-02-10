/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    black: '#0a0a0a',
                    gray: '#171717',
                    light: '#FAFAFA',
                    gold: '#B4975A',
                    goldLight: '#D4AF37', // New
                    goldDark: '#8C7335',  // New
                    goldHover: '#C6A355',
                }
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
                serif: ['"Outfit"', 'sans-serif'], // Replaced Playfair Display with Outfit
            },
            backgroundImage: {
                'noise': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')",
            }
        },
    },
    plugins: [],
}
