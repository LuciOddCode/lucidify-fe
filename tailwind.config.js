/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-blue': 'var(--primary-blue)',
                'secondary-blue': 'var(--secondary-blue)',
                'soft-teal': 'var(--soft-teal)',
                'warm-gray': 'var(--warm-gray)',
                'dark-navy': 'var(--dark-navy)',
            },
        },
    },
    plugins: [],
}