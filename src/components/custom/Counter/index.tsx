/**
 * @description
 * Valine 会自动查找页面中 class 值为 leancloud_visitors 的元素，获取其 id 为查询条件
 * 将得到的值填充到其 class 的值为 leancloud-visitors-count 的子元素里
 */

import React, { ReactChild } from 'react'
import Script from 'react-load-script'

interface Props {
  title: string
  ele?: string
  url?: string
  attributes?: {
    [prop: string]: string
  }
  onError?: () => void
  onLoad?: () => void
  onCreate?: () => void
}

class Counter extends React.PureComponent<Props, {}> {
  private static defaultProps = {
    attributes: {
      ele: `#${window.location.pathname.slice(1).replace('/', '_')}`,
      crossorigin: 'anonymous',
      async: true
    },
    onCreate: () => {},
    onError: () => {},
    onLoad: () => {}
  }

  public componentDidMount(): void {}

  private core(): void {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    new Valine({
      appId: '6SzbwMChoGnbO7Sd7p85NYJL-MdYXbMMI',
      appKey: 'KRYPjCv7J5jQipWL1xwxkI55',
      recordIP: true,
      visitor: true // 阅读量统计
    })
  }

  public render(): ReactChild {
    const { core } = this
    const {
      url = '//unpkg.com/valine/dist/Valine.min.js',
      attributes = {},
      onError,
      // onLoad,
      title
    } = this.props

    return (
      <>
        <div className="counter-container">
          <div id={attributes.ele.slice(1)} className="leancloud_visitors" data-flag-title={title}>
            <span className="cn-colon">发布日期</span>
            <span className="sub-time">2019-09-26</span>
            <span className="post-meta-item-text cn-colon">阅读量</span>
            <span className="leancloud-visitors-count">+1</span>
          </div>
        </div>

        <Script url={url} onError={onError} onLoad={core} attributes={attributes} />
      </>
    )
  }
}

export default Counter
