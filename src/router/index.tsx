import { lazy } from 'react'
import renderRoutesCore from './renderRoutes'

const routes = [
  {
    key: 'articleList',
    path: '/article-list',
    exact: true,
    component: lazy(() => import('../views/ArticleList')),
    meta: {
      title: 'topbar.main' // 使用国际化中的键
    }
  }
]

const renderRoutes = (): JSX.Element | null => {
  return renderRoutesCore(routes)
}

export default renderRoutes
