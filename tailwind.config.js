/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
    ],
    theme: {
        extend: {
            keyframes: {
                pingOnce: {
                    '75%, 100%': { transform: 'scale(1.5)', opacity: '0' },
                },
            },
            animation: {
                pingOnce: 'pingOnce 1s cubic-bezier(0, 0, 0.2, 1) 1',
            },
        },
    },
    plugins: [],
}
