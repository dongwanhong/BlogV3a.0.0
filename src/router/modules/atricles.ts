import { lazy } from 'react'

const articles = [
  {
    key: 'articleDemo',
    path: '/articles/demo',
    exact: true,
    component: lazy(() => import('@views/articles/ArticleDemo')),
    meta: {
      title: 'article.demo'
    }
  }
]

export default articles
