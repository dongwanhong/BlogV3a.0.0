const path = require('path');

const baseConfig = {
  entry: './src/index.js', // 入口文件，默认 main 作为名称
  output: {
    path: path.resolve(__dirname, '../dist'), // 指定输出文件所在目录
    filename: '[name].js' // 输出文件名，其中 name 为变量，值为入口文件名
  }
};

module.exports = baseConfig;
