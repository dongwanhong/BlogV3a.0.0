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
    ]
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
