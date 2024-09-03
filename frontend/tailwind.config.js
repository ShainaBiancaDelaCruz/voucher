export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    
    extend: {
      screens: {
        Mobile : "375px",
        Tablet : "850px",
        Desktop: "1440px",
      },
      
      colors: {
          'primary': '#D8E9A8',
          'secondary': '#191A19',
          'accent': '#4E9F3D',
          'accent-dark' : '#1E5128',
          'dark-gray' : '#222831',
          'light-gray' : '#F6F6F6',
          'light-gray-2' : '#EAEAEA',
          'light-gray-3' : '#A39D9D',


      },
    },
  },
  plugins: [],
};