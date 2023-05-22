/** @type {import('tailwindcss').Config} */
module.exports = {
    
    content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
    theme: {
       
        extend: {
            fontFamily: {
                lofi: ['Pumpkin'],
                spring: ['Springtime'],
                bebas: ['Farmhouse']
            },
        },
    },

    plugins: [],
}