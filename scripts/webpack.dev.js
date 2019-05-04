const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const htmlWebpackPluginConf = {
  template: './app/index.html', // 指定模版
  filename: 'index.html', // 输出文件名
  favicon: './app/images/favicon.ico'
};

const devConfig = {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginConf)
  ]
};

module.exports = merge(common, devConfig);
