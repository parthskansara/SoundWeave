/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    
    extend: {
      colors:{
        'delete':{
          'inactive': '#C7000099',
          'active': '#C70000'
        },
        
      },
    },
  },
  plugins: [],
}

