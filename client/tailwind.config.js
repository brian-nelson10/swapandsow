/** @type {import('tailwindcss').Config} */
module.exports = {
    
    content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
    theme: {
       
        extend: {
            fontFamily: {
                lofi: ['Lofi'],
                spring: ['Springtime'],
                bebas: ['Bebas Neue']
            },
        },
    },

    plugins: [],
}