/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
        extend: {
            height: {
                25: '6.25rem',
            },
            gridTemplateRows: {
                'layout': '60px 1fr 100px'
            }
        },
    },
    plugins: [],
}
