import React, { PureComponent, ReactChild } from 'react'
import { Link } from '../../components'

class ArticleList extends PureComponent {
  public render(): ReactChild {
    return <Link to="/articles/demo">文章 Demo</Link>
  }
}

export default ArticleList
