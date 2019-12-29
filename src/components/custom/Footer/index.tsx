import React, { Component } from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import { Counter } from '@/components'

class Footer extends Component<WrappedComponentProps, {}> {
  public render(): React.ReactNode {
    const { intl } = this.props

    return (
      <div className="footer">
        {`Copyright © 2019-${new Date().getFullYear()} XiaoJiu dongwanhong.github.io all right reserved`}
        <Counter
          ele="home"
          title="小九的博客"
          des={intl.formatMessage({ id: 'common.visiteVolume' })}
          showTime={false}
        />
      </div>
    )
  }
}

export default injectIntl(Footer)
