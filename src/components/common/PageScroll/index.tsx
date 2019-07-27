/**
 * @description
 * 全屏滚动组件
 * @param {number} activeIndex 可选的，当前显示的屏数，以零开始计
 * @param {(isDown: boolean) => void} onSlide 可选的，滑动时执行的函数，参数为是否是下滑
 */

import React, { PureComponent, ReactNode, WheelEvent } from 'react'
import utils from '../../../utils'
import PageItem from './components/PageItem'

interface Props {
  activeIndex?: number
  onSlide?: (isDown: boolean) => void
}

class PageScroll extends PureComponent<Props, {}> {
  public static PageItem = PageItem
  public totalHeight: number
  public count: number
  public height: number

  public constructor(props: Props) {
    super(props)
    this.count = 0
    this.height = 0
    this.totalHeight = 0
    this.handleWheel = utils.throttle(this.handleWheel.bind(this), 1000)
    this.getTop = this.getTop.bind(this)
  }

  public componentWillMount(): void {
    const { children } = this.props
    this.count = React.Children.count(children)
    this.height = document.documentElement.clientHeight || document.body.clientHeight
    this.totalHeight = this.height * this.count
  }

  public handleWheel(event: WheelEvent<HTMLDivElement>): void {
    const { deltaY } = event
    const { onSlide } = this.props
    if (onSlide) {
      onSlide(deltaY < 0)
    }
  }

  public getTop(): number {
    const { activeIndex = 0 } = this.props
    const { count, height, totalHeight } = this
    if (activeIndex < 0) {
      return 0
    } else if (activeIndex + 1 > count) {
      return height - totalHeight
    } else {
      return -activeIndex * height
    }
  }

  public render(): ReactNode {
    const { height, totalHeight, getTop, handleWheel } = this
    const { children } = this.props

    return (
      <div className="page-scroll" style={{ height }}>
        <div
          className="scroll-container"
          style={{ height: totalHeight, top: getTop() }}
          onWheel={handleWheel}
        >
          {React.Children.map(children, oChildren =>
            React.isValidElement(oChildren) ? React.cloneElement(oChildren, { height }) : null
          )}
        </div>
      </div>
    )
  }
}

export { PageScroll, PageItem }
