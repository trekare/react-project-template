'use strict';

const autoprefixer = require('autoprefixer');
const customProperties = require('postcss-custom-properties');

module.exports = {
  plugins: () => [
    require('autoprefixer')({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
    require('postcss-custom-properties')({
      variables: require('../src/stylesVariables'),
    }),
  ],
};
