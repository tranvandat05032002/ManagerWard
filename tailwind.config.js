/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--primary)',
                    box: 'var(--primary-box)',
                    hover: 'var(--primary-hover)',
                    light: 'var(--primary-light)',
                    dark: 'var(--primary-dark)',
                },
            },
        },
    },
    plugins: [],
} 