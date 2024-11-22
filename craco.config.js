const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@mocks': path.resolve(__dirname, 'src/mocks'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@colors': path.resolve(__dirname, 'src/colors'),
      '@redux': path.resolve(__dirname, 'src/redux-toolkit'),
      '@root': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      webpackConfig.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx'];
      return webpackConfig;
    },
  },
};
