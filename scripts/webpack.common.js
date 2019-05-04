const path = require('path');

const rules = [{
  test: /\.less$/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader'
  }, {
    loader: 'less-loader'
  }]
}];

const baseConfig = {
  entry: './app/index.js', // 入口文件，默认 main 作为名称
  output: {
    path: path.resolve(__dirname, '../dist'), // 指定输出文件所在目录
    filename: '[name].js' // 输出文件名，其中 name 为变量，值为入口文件名
  },
  module: {
    rules: rules
  }
};

module.exports = baseConfig;
