import renderRoutesCore from './renderRoutes'
import ArticleList from '../views/ArticleList'

const routes = [
  {
    path: '/article-list',
    exact: true,
    component: ArticleList
  }
]

const renderRoutes = (): JSX.Element | null => {
  return renderRoutesCore(routes)
}

export default renderRoutes
