module.exports = {
  purge: {
    content: ['./public/**/*.html', './src/**/*.vue'],
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        whitesmoke: '#ececec',
        steelblue: '#5176cc',
        snow: '#fbfbfb',
        seagreen: '#408c55',
        limegreen: '#44c17b',
        indianred: '#bd7172',
      },
      width: {
        '440px': '440px',
      },
    },
  },
  plugins: [],
};
