/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  tailwindConfig: './styles/tailwind.config.js',
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif']
    },
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900'
    },
    screens: {
      tablet: '700px',
      // => @media (min-width: 700px) { ... }
      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }
      desktop: '1280px'
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        fill_grey: '#cdcccc',
        fill_blue: '#2b87d1',
        text_black: '#333333',
        boxShadow: {
          '2xl': '0px 12px 15px rgba(0, 0, 0, 0.07) ;'
        },
        background: {
          gray: {
            100: '#ffffff',
            200: '#fafafa',
            300: '#f2f2f2',
            400: '#e9e9e9',
            500: '#e6e8f4',
            600: '#00000026',
            700: '#000000b3'
          },
          yellow: '#ffd154',
          blue: {
            500: '#4285f5',
            200: '#2b87d1'
          },
          pink: '#f53264',
          green: '#4bdb6a'
        }
      },
      text: {
        gray: {
          100: '#a0a0a0',
          200: '#9e9ea6',
          300: '#00000080',
          400: '#00000066',
          500: '#393939',
          600: '#333333',
          700: '#000000bf',
          800: '#000000d9'
        },
        blue: {
          100: '#45b1ff',
          200: '#4896fa',
          300: '##4285f4',
          400: '##2b87d1'
        }
      }
    }
  },
  plugins: []
}
