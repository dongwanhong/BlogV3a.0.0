import React, { SFC } from 'react'
import { Link } from '@/components'

interface Props {
  des: string
  src: string
  to: string
  title: string
}

const ArticleItem: SFC<Props> = props => {
  const { to, des, src, title } = props

  return (
    <div className="article-item">
      <div className="article-title">{title}</div>
      <div className="article-content">
        <div className="article-left">
          <img src={src} alt="mias" />
        </div>
        <div className="article-right">
          <div className="short-des">{`摘要：${des}`}</div>
          <div className="more-btn">
            <Link to={to}>查看详情 ></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleItem
