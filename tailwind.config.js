/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    
    extend: {
      colors:{
        'primary': '#E5D3B3',
        'secondary': '#be9b7b',
        'header': '#8c2a26',
        'font' : {
          'light': '#fff4e6',
          'dark': '#4b3832'
        },
        'outline': '#4b3832',
        'delete':{
          'inactive': '#C7000099',
          'active': '#C70000'
        },
        
      },
    },
  },
  plugins: [],
}

