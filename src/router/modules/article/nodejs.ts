import { lazy } from 'react'

const nodejs = [
  {
    key: 'cusTomNodeRequire',
    path: '/articles/custom-node-require',
    exact: true,
    component: lazy(() => import('@views/articles/nodejs/CusTomNodeRequire')),
    meta: {
      title: 'article.cusTomNodeRequire'
    },
    show: true,
    title: '理清 Nodejs 中的 require 函数',
    des:
      '在 ES6 出现之前 JavaScript 本身并没有模块的概念，不支持封闭的作用域和依赖管理，这对于开发大型项目来说十分头疼。所以，社区制定了一些模块加载方案来解决这个问题，其中就包括 CommonJS 规范，在此规范中每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。2009 年，Nodejs 项目诞生，所有模块一律采用 CommonJS 规范，并通过内置的 require 函数来加载模块文件。',
    src: '',
    tags: ['Javascript', 'Nodejs'],
    types: ['Nodejs']
  }
]

export default nodejs
