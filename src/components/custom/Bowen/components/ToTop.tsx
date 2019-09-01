import React, { Component, ReactChild } from 'react'
import config from '../config'

class ToTop extends Component<{}, {}> {
  protected requestId: number

  public constructor(props: {}) {
    super(props)
    this.requestId = 0
    this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this)
  }

  public componentDidMount(): void {
    window.addEventListener('wheel', this.cancelAnimationFrame)
  }

  public componentWillUnmount(): void {
    window.removeEventListener('wheel', this.cancelAnimationFrame)
  }

  public cancelAnimationFrame(): void {
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
    return (
      <div id="fixed-tools">
        <div className="backtop" onClick={() => this.toTop(config.step)}>
          回到顶部
        </div>
      </div>
    )
  }
}

export default ToTop
