const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    boxShadow: {
      'inner-xl':
        'rgb(133 133 133) -1px 1px 6px 0px inset, rgba(255, 255, 255, 0.5) -15px -9px 6px 1px inset',
    },
    fontFamily: {
      sans: ['Roboto', ...defaultTheme.fontFamily.sans],
    },
  },
};
export const plugins = [];
