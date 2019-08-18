import { lazy } from 'react'
import renderRoutesCore from './renderRoutes'

const routes = [
  {
    key: 'articleList',
    path: '/article-list',
    exact: true,
    component: lazy(() => import('../views/ArticleList')),
    meta: {
      title: '博文'
    }
  }
]

const renderRoutes = (): JSX.Element | null => {
  return renderRoutesCore(routes)
}

export default renderRoutes
