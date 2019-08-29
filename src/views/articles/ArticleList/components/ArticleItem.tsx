import React, { SFC } from 'react'
import { Link } from '@/components'

interface Props {
  des: string
  src: string
  alt?: string
  to: string
  title: string
}

const ArticleItem: SFC<Props> = props => {
  const { to, des, src, title, alt } = props

  return (
    <div className="article-item container-fluid">
      <div className="article-title row">
        <div className="col-lg-12">
          <Link to={to}>{title}</Link>
        </div>
      </div>
      <div className="article-content row">
        <div className="article-left col-lg-4 col-xs-12">
          <img src={src} alt={alt || ''} />
        </div>
        <div className="article-right col-lg-8 col-xs-12">
          <div className="short-des">{`摘要：${des}`}</div>
          <div className="more-btn">
            <Link to={to}>查看详情 &gt;</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleItem
