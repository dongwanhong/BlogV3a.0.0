const merge = require('webpack-merge');
const common = require('./webpack.common');

const devConfig = {
  mode: 'development'
};

module.exports = merge(common, devConfig);
