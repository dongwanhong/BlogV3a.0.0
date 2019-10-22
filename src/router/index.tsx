/**
 * @description
 * 在 update-time-loader 中会对 modules/article 下的路由再处理
 * 也就是根据读取 component 指定路径获取该文件的创建时间，并写入对应路由对象
 * 因此在其中修改时需注意 update-time-loader 中的匹配规则
 */
import { lazy } from 'react'
import renderRoutes from './renderRoutes'
import articles from './modules/atricles'

const routes = [
  {
    key: 'articleList',
    path: '/article-list',
    exact: true,
    component: lazy(() => import('@views/articles/ArticleList')),
    meta: {
      title: 'topbar.main' // 使用国际化中的键
    }
  },
  ...articles
]

export { routes, articles }

export default renderRoutes
