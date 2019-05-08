/**
 * 创建一个自己的 preset，只需导出一份配置即可，可以是返回一个插件数组
 * 在 preset 中可以包含其他的 preset，以及带有参数的插件。
 */
module.exports = function(api) {
  api.cache(true);

  // 插件先于 Preset 执行，顺序由上往下而行
  const plugins = [
    ["@babel/plugin-proposal-decorators", {
      legacy: true,
    }],
    "@babel/plugin-proposal-class-properties",
  ];
  // Preset 执行顺序相反由下向上而行
  const presets = [
    // 如果 preset 名称的前缀为 babel-preset- 可以省略该前缀
    '@babel/preset-env'
  ];

  return {
    presets,
    plugins
  };
};
