const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const rules = [{
  test: /\.(le|c)ss$/,
  use: [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: devMode,
    }
  }, {
    loader: 'css-loader'
  }, {
    loader: 'postcss-loader'
  }, {
    loader: 'less-loader'
  }]
}];

const htmlWebpackPluginConf = {
  template: './app/index.html', // 指定模版
  filename: 'index.html', // 输出文件名
  favicon: './app/images/favicon.ico',
  minify: devMode ? null : {
    removeComments: true, // 移除注释
    removeRedundantAttributes: true, // 移除冗余属性
    collapseWhitespace: true // 移除空白
  }
};

const miniCssExtractPluginCfg = {
  filename: 'styles/[name].css',
};

const baseConfig = {
  entry: './app/index.js', // 入口文件，默认 main 作为名称
  output: {
    path: path.resolve(__dirname, '../dist'), // 指定输出文件所在目录
    filename: 'javascript/[name].js' // 输出文件名，其中 name 为变量，值为入口文件名
  },
  module: {
    rules: rules
  },
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginConf),
    new MiniCssExtractPlugin(miniCssExtractPluginCfg),
  ]
};

module.exports = baseConfig;
