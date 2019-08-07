# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/Anani1994/BlogV3a.0.0/compare/v1.1.0...v1.2.0) (2019-08-07)


### Bug Fixes

* export 'State' was not found in './types' & 路由跳转失效 ([b10e94c](https://github.com/Anani1994/BlogV3a.0.0/commit/b10e94c))
* 跳转后返回 Home 组件时的跳转按钮依旧显示 & Home 组件和 Main 组件同时显示 ([76bad9e](https://github.com/Anani1994/BlogV3a.0.0/commit/76bad9e))
* **home*:** 组件 Main 返回 Home 时可见 Step 组件按钮 & TS 中引入图片资源提示错误 ([3ade223](https://github.com/Anani1994/BlogV3a.0.0/commit/3ade223))
* **main:** 滚动到顶部后继续滚动会导致下次向下滚动时需触发两次才会滚动 ([da9103c](https://github.com/Anani1994/BlogV3a.0.0/commit/da9103c))


### Features

* 使用 redux 和 immutable 管理数据 ([9051abd](https://github.com/Anani1994/BlogV3a.0.0/commit/9051abd))
* 基于 react-router-dom 创建路由使用基础" ([ba3a415](https://github.com/Anani1994/BlogV3a.0.0/commit/ba3a415))
* 完善首页基本内容，完成简单的路由跳转 ([711e2bc](https://github.com/Anani1994/BlogV3a.0.0/commit/711e2bc))
* 对首页的基础内容进行简单布局 ([8d14b3f](https://github.com/Anani1994/BlogV3a.0.0/commit/8d14b3f))
* 封装高阶组件 RouteAnimated 实现路由切换动画 ([e1f3e73](https://github.com/Anani1994/BlogV3a.0.0/commit/e1f3e73))
* 构建全屏滚动组件的基本功能 ([1a9d18b](https://github.com/Anani1994/BlogV3a.0.0/commit/1a9d18b))
* ***.less:** 将布局样式和颜色样式进行分离 ([db9aa3c](https://github.com/Anani1994/BlogV3a.0.0/commit/db9aa3c))
* **home*:** 使用 Rain 组件和水波组件完成首页样式 ([4b8e931](https://github.com/Anani1994/BlogV3a.0.0/commit/4b8e931))
* **main*:** 在 Main 中结合使用步骤组件和全屏滚动组件 ([e35315f](https://github.com/Anani1994/BlogV3a.0.0/commit/e35315f))
* **page scroll:** 使用 Props 管理全屏滚动组件以避免使用派生 State ([0971410](https://github.com/Anani1994/BlogV3a.0.0/commit/0971410))
* **step*:** 完成步骤条组件的基本功能 ([d8e22e6](https://github.com/Anani1994/BlogV3a.0.0/commit/d8e22e6))
* **step*:** 调整和新增步骤组件的条形样式 ([64c8073](https://github.com/Anani1994/BlogV3a.0.0/commit/64c8073))
* **step*:** 调整步骤组件样式、设置在 dot 模式下不渲染标题和描述 ([27879ec](https://github.com/Anani1994/BlogV3a.0.0/commit/27879ec))
* **util:** 完成工具雨类的实现 ([1e4e12c](https://github.com/Anani1994/BlogV3a.0.0/commit/1e4e12c))
* **util*:** 基于雨类创建 Rain 组件 ([580ab6d](https://github.com/Anani1994/BlogV3a.0.0/commit/580ab6d))
* **utils:** 调整工具类结构，创建雨类基本结构 ([ed4ef4c](https://github.com/Anani1994/BlogV3a.0.0/commit/ed4ef4c))
* **water-wave*:** 添加 WaterWave 水波组件 ([348a31f](https://github.com/Anani1994/BlogV3a.0.0/commit/348a31f))



## 1.1.0 (2019-07-03)


### Bug Fixes

* fix Cannot use [chunkhash] or [contenthash] for chunk in '[name].[chunkhash].js' (use [hash] instead) ([103cfae](https://github.com/Anani1994/BlogV3a.0.0/commit/103cfae))
* Ignored an update to unaccepted module ./app/index.js -> 0 ([62419cc](https://github.com/Anani1994/BlogV3a.0.0/commit/62419cc))
* ***.css|*.less:** 生成模式下样式代码丢失 ([bdcc2fc](https://github.com/Anani1994/BlogV3a.0.0/commit/bdcc2fc))


### Features

* 以 HtmlWebpackPlugin 插件简化 HTML 文件的创建 ([5ab9a44](https://github.com/Anani1994/BlogV3a.0.0/commit/5ab9a44))
* 使用 babel 编译 typescript、按需加载 lodash ([6b035e4](https://github.com/Anani1994/BlogV3a.0.0/commit/6b035e4))
* 使用 cross-env 模块预设环境变量以区别配置 ([34e6903](https://github.com/Anani1994/BlogV3a.0.0/commit/34e6903))
* 使用 husky lint-staged 进行代码提交前检测 ([d93b3ef](https://github.com/Anani1994/BlogV3a.0.0/commit/d93b3ef))
* 使用 MiniCssExtractPlugin 插件分离样式文件 ([c432113](https://github.com/Anani1994/BlogV3a.0.0/commit/c432113))
* 使用 module.noParse 忽略解析大型第三方库提供构建速度 ([be03176](https://github.com/Anani1994/BlogV3a.0.0/commit/be03176))
* 使用 prettier 格式化代码 ([831e401](https://github.com/Anani1994/BlogV3a.0.0/commit/831e401))
* 使用 purifycss-webpack 消除未生效的样式代码 ([8e68e76](https://github.com/Anani1994/BlogV3a.0.0/commit/8e68e76))
* 使用 shim 处理全局依赖并结合 exports-loader 按需加载 ([28c0ef9](https://github.com/Anani1994/BlogV3a.0.0/commit/28c0ef9))
* 使用 source map 定位在原文件中的位置 ([959ac07](https://github.com/Anani1994/BlogV3a.0.0/commit/959ac07))
* 使用 SplitChunksPlugin 实现公共代码分离 ([00e6eca](https://github.com/Anani1994/BlogV3a.0.0/commit/00e6eca))
* 使用 style-loader 结合环境变量避免开发模式下提取样式 ([ffc42ba](https://github.com/Anani1994/BlogV3a.0.0/commit/ffc42ba))
* 使用 TerserJSPlugin 和 OptimizeCSSAssetsPlugin 压缩代码 ([242216d](https://github.com/Anani1994/BlogV3a.0.0/commit/242216d))
* 使用 webpack-merge 为每个环境启用独立的 webpack 配置 ([aa8ae42](https://github.com/Anani1994/BlogV3a.0.0/commit/aa8ae42))
* 使用HappyPack 对资源进行并行打包 ([0cc70fb](https://github.com/Anani1994/BlogV3a.0.0/commit/0cc70fb))
* 使用stylelint 对样式代码进行规范性检测 ([d385baa](https://github.com/Anani1994/BlogV3a.0.0/commit/d385baa))
* 使用相应包解决 lint 与 prettier 之间的冲突 ([0f56991](https://github.com/Anani1994/BlogV3a.0.0/commit/0f56991))
* 使用脚本命令启用基本配置进行打包 ([a3f200b](https://github.com/Anani1994/BlogV3a.0.0/commit/a3f200b))
* 使用自动编译工具 webpack-dev-server 实现实时编译和刷新 ([629e655](https://github.com/Anani1994/BlogV3a.0.0/commit/629e655))
* 初始化项目仓库 ([8a22294](https://github.com/Anani1994/BlogV3a.0.0/commit/8a22294))
* 基于 React App 对 React、TypeScript 等进行语法检测 ([0e97a15](https://github.com/Anani1994/BlogV3a.0.0/commit/0e97a15))
* 安装和配置 React、TypeScript 基础开发环境 ([537e050](https://github.com/Anani1994/BlogV3a.0.0/commit/537e050))
* 更改项目介绍、添加自动发布的命令 ([5f02bf1](https://github.com/Anani1994/BlogV3a.0.0/commit/5f02bf1))
* 结合 react-hot-loader 配置 react 的热更新 ([bce0984](https://github.com/Anani1994/BlogV3a.0.0/commit/bce0984))
* 结合resolve 属性简化开发工作中的代码 ([3ff54bf](https://github.com/Anani1994/BlogV3a.0.0/commit/3ff54bf))
* 还原基础功能实现，解决相关语法检测提示 ([4ea2564](https://github.com/Anani1994/BlogV3a.0.0/commit/4ea2564))
* 配置 webpack 以使得生成的文件可以缓存并在改变后能够更新 ([be320c1](https://github.com/Anani1994/BlogV3a.0.0/commit/be320c1))
* 配置检测 Git Commit Message 优雅提交描述 ([05adc1a](https://github.com/Anani1994/BlogV3a.0.0/commit/05adc1a))
* 零配置进行第一次打包 ([bbed77c](https://github.com/Anani1994/BlogV3a.0.0/commit/bbed77c))
* ***.js:** 举例按需配置 Babel 插件 ([cdb378a](https://github.com/Anani1994/BlogV3a.0.0/commit/cdb378a))
* ***.js:** 使用 @babel/plugin-syntax-dynamic-import 实现懒加载 ([978f97e](https://github.com/Anani1994/BlogV3a.0.0/commit/978f97e))
* ***.js:** 使用 tree shaking 消除未使用的 JavaScript 代码 ([4f9d6f0](https://github.com/Anani1994/BlogV3a.0.0/commit/4f9d6f0))
* ***.js:** 使用env prese 针对目标浏览器中缺失的功能进行代码转换 ([feba84b](https://github.com/Anani1994/BlogV3a.0.0/commit/feba84b))
* ***.js:** 配置使用 eslint 进行语法检测 ([a84d5ed](https://github.com/Anani1994/BlogV3a.0.0/commit/a84d5ed))
* ***.less:** 使用 postss-loader 和 autoprefixer 插件添加 CSS 前缀 ([6eab577](https://github.com/Anani1994/BlogV3a.0.0/commit/6eab577))
* ***.less:** 使用合适的 loader 在 JavaScript 模块中加载样式 ([14a0a03](https://github.com/Anani1994/BlogV3a.0.0/commit/14a0a03))
* **font|img:** 使用 url-loader、file-loader 处理字体和图片文件 ([9aaf9a2](https://github.com/Anani1994/BlogV3a.0.0/commit/9aaf9a2))
* **jquery:** 使用 expose-loader 将 jquery 暴露到全局对象 ([400c4bc](https://github.com/Anani1994/BlogV3a.0.0/commit/400c4bc))
