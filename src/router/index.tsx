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

export { routes }

export default renderRoutes
