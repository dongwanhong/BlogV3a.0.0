import React, { Component } from 'react'
import { Counter } from '@/components'

class Footer extends Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <div className="footer">
        {`Copyright © 2019-${new Date().getFullYear()} XiaoJiu dongwanhong.github.io all right reserved`}
        <Counter ele="home" title="小九的博客" des="访问量" showTime={false} />
      </div>
    )
  }
}

export default Footer
