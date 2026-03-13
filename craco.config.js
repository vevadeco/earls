const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add path alias @ to src
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@': path.resolve(__dirname, 'src')
      };
      return webpackConfig;
    }
  }
};
