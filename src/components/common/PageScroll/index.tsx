import React, { PureComponent, ReactNode, WheelEvent } from 'react'
import utils from '../../../utils'
import PageItem from './components/PageItem'

interface State {
  top: number
  height: number
}

class PageScroll extends PureComponent<{}, State> {
  public static PageItem = PageItem
  public totalHeight: number

  public state = {
    top: 0,
    height: document.documentElement.clientHeight || document.body.clientHeight
  }

  public constructor(props: {}) {
    super(props)
    this.totalHeight = 0
    this.handleWheel = utils.throttle(this.handleWheel.bind(this), 1000)
  }

  public componentDidMount(): void {
    const { height } = this.state
    const { children } = this.props
    const childrenLen = React.Children.count(children)
    this.totalHeight = height * childrenLen
  }

  public handleWheel(event: WheelEvent<HTMLDivElement>): void {
    const { deltaY } = event
    const { totalHeight } = this
    const { top, height } = this.state
    if (deltaY < 0 && top < 0) {
      this.setState(() => ({
        top: top + height
      }))
    } else if (deltaY > 0 && top > height - totalHeight) {
      this.setState(() => ({
        top: top - height
      }))
    }
  }

  public render(): ReactNode {
    const { totalHeight, handleWheel } = this
    const { height, top } = this.state
    const { children } = this.props

    return (
      <div className="page-scroll" style={{ height }}>
        <div
          className="scroll-container"
          style={{ height: totalHeight, top }}
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
