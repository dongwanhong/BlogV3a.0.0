import { lazy } from 'react'
import nodejs from './article/nodejs'
import { RetArticleRouteConfig } from '../types'

const articles: RetArticleRouteConfig[] = [
  {
    key: 'articleDemo',
    path: '/articles/demo',
    exact: true,
    component: lazy(() => import('@views/articles/ArticleDemo')),
    meta: {
      title: 'article.demo'
    },
    show: false,
    title: '调试页面',
    des: '组件调试页面，提供开发组件时使用。',
    src: '',
    tags: [],
    types: []
  },
  ...nodejs
]

export default articles
