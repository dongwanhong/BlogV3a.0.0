const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');

const prodConfig = {
  mode: 'production',
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserJSPlugin()
    ],
    splitChunks: {
      chunks: 'async',
      name: true,
      automaticNameDelimiter: '-',
      // the priority is maxInitialRequest/maxAsyncRequests < maxSize < minSize
      minSize: 0,
      maxSize: 0,
      minChunks: 1, // 引用计数
      maxAsyncRequests: 5, // 最大的并行请求数
      maxInitialRequests: 3, // 入口最大的并行请求数
      cacheGroups: { // 缓存组，会继承 splitChunks 的配置
        lodash: {
          // filename: '[name].bundle.js',
          priority: -10, // 缓存组打包的先后优先级
          test: /lodash/, // 控制哪些模块被这个缓存组匹配到
          chunks: 'all',
        },
        common: {
          priority: -20,
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true, // 如果当前代码块包含的模块已经有了，就不在产生一个新的代码块
        },
      },
    },
  },
  plugins: [
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute
      paths: glob.sync([
        path.join(process.cwd(), 'app/**/*.html'),
        path.join(process.cwd(), 'app/**/*.js'),
      ]),
    }),
  ],
};

module.exports = merge(common, prodConfig);
