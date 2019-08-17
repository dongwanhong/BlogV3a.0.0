import renderRoutesCore from './renderRoutes'
import ArticleList from '../views/ArticleList'

const routes = [
  {
    key: 'articleList',
    path: '/article-list',
    exact: true,
    component: ArticleList,
    meta: {
      title: '博文'
    }
  }
]

const renderRoutes = (): JSX.Element | null => {
  return renderRoutesCore(routes)
}

export default renderRoutes
