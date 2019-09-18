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
      '在 ES6 出现之前 JavaScript 本身并没有模块的概念，不支持封闭的作用域和依赖管理，这对于开发大型项目来说十分头疼。所以，社区制定了一些模块加载方案来解决这个问题，其中就包...',
    src: 'https://ws1.sinaimg.cn/large/dac84c10ly1g6vyid8uwtj21xgb38qv7.jpg',
    tags: ['JavaScript', 'Node.js'],
    types: ['后端开发']
  }
]

export default nodejs
