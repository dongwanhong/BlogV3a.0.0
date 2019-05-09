const merge = require('webpack-merge');
const common = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
};

module.exports = merge(common, devConfig);
