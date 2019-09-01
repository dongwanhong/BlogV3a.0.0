import React, { createRef, RefObject, PureComponent, ReactChild } from 'react'
import config from '../config'

interface Props {
  id: string
  text: string
}

class Title extends PureComponent<Props, {}> {
  public eleRef: RefObject<HTMLDivElement>

  public constructor(props: Props) {
    super(props)
    this.eleRef = createRef()
    this.startScroll = this.startScroll.bind(this)
  }

  public startScroll(eve: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    eve.preventDefault()
    const { eleRef } = this
    const ele = document.querySelector('#bowen') as HTMLElement
    const cEle = eleRef.current
    if (!ele || !cEle) return
    const offsetHeight = ele.offsetHeight
    const scrollHeight = ele.scrollHeight
    const scrollCore = (): void => {
      const nTop = cEle.getBoundingClientRect().top
      if (nTop > config.top && offsetHeight + ele.scrollTop < scrollHeight) {
        ele.scrollTop += config.step
        requestAnimationFrame(scrollCore)
      }
    }
    scrollCore()
  }

  public render(): ReactChild {
    const { eleRef, startScroll } = this
    const { id, text } = this.props

    return (
      <a className="title" href={`#${id}`} onClick={eve => startScroll(eve)}>
        <h4 ref={eleRef} id={id}>
          {text}
        </h4>
      </a>
    )
  }
}

export default Title
