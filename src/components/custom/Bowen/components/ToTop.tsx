import React, { Component, ReactChild } from 'react'
import utils from '@/utils'
import config from '../config'

interface State {
  show: boolean
}

class ToTop extends Component<{}, State> {
  protected requestId: number

  public state: State = {
    show: false
  }

  public constructor(props: {}) {
    super(props)
    this.requestId = 0
    this.cancelAnimationFrame = utils.throttle(this.cancelAnimationFrame.bind(this), 4)
  }

  public componentDidMount(): void {
    window.addEventListener('wheel', this.cancelAnimationFrame)
  }

  public componentWillUnmount(): void {
    window.removeEventListener('wheel', this.cancelAnimationFrame)
  }

  public cancelAnimationFrame(): void {
    const ele = document.querySelector('#bowen')
    const { show } = this.state
    if (!ele) return
    if (ele.scrollTop > 200 && !show) {
      this.setState({ show: true })
    } else if (ele.scrollTop < 200 && show) {
      this.setState({ show: false })
    }
    cancelAnimationFrame(this.requestId)
  }

  public toTopCore(step: number): void {
    const ele = document.querySelector('#bowen')
    if (!ele) return
    const scrollTop = ele.scrollTop
    if (scrollTop > 0) {
      ele.scrollTop -= step
      this.toTop(step)
    }
  }

  public toTop(step: number): void {
    this.requestId = requestAnimationFrame(() => this.toTopCore(step))
  }

  public render(): ReactChild {
    const { show } = this.state

    return (
      <div id="fixed-tools">
        {show ? (
          <div className="backtop" onClick={() => this.toTop(config.step)}>
            ^
          </div>
        ) : null}
      </div>
    )
  }
}

export default ToTop
