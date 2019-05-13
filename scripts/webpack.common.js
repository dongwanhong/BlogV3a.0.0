const path = require('path');
const webpack = require('webpack');
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
}, {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
}, {
  test: /\.(png|svg|jpg|gif)$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: 'images/[name].[ext]',
      fallback: 'file-loader',
    }
  }]
}, {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: 'font/[name].[ext]',
      fallback: 'file-loader',
    },
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
  filename: 'styles/[name].[contenthash:8].css',
};

const providePluginCfg = {
  clone: 'exports-loader?clone!lodash/clone',
};

const baseConfig = {
  entry: './app/index.js', // 入口文件，默认 main 作为名称
  output: {
    path: path.resolve(__dirname, '../dist'), // 指定输出文件所在目录
    filename: devMode ?
    'javascript/[name].js' :
    'javascript/[name].[contenthash:8].js' // 输出文件名，其中 name 为变量，值为入口文件名
  },
  module: {
    rules: rules,
    noParse: /jquery/,
  },
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginConf),
    new MiniCssExtractPlugin(miniCssExtractPluginCfg),
    new webpack.ProvidePlugin(providePluginCfg),
  ]
};

module.exports = baseConfig;
