
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors:{
        green:'#8fbe8a',
        purple:'#b082a9',
        blue:'#758fb5',
        black:'#282828',
        gray:'#e6e6e6',
        darkgray:'#6c757d',
        red:' #dc3545',
        white:'#fff',
        
      },
      boxShadow:{
          shadowe2:'2px 4px 3px #fff ',
      }
    }
  
    
  },
  plugins: [],
}