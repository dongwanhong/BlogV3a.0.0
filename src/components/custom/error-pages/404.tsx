import React, { SFC } from 'react'
import { Link } from 'react-router-dom'

const NotFound: SFC<{}> = () => (
  <div className="page-404">
    <div className="page-left" />
    <div className="page-right">
      <div className="text">
        <p>哎呀，网页走丢啦。</p>
        <p>
          我们正在联系火星总部以寻找您访问的页面，您可以点击 <Link to="/">返回首页</Link>{' '}
          继续查看其它页面。
        </p>
      </div>
    </div>
  </div>
)

export default NotFound
