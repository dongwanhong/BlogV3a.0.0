const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const htmlWebpackPluginConf = {
  template: './app/index.html', // 指定模版
  filename: 'index.html', // 输出文件名
  favicon: './app/images/favicon.ico',
  minify: {
    removeComments: true, // 移除注释
    removeRedundantAttributes: true, // 移除冗余属性
    collapseWhitespace: true // 移除空白
  }
};

const prodConfig = {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginConf)
  ]
};

module.exports = merge(common, prodConfig);
