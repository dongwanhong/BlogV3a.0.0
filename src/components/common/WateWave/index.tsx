/**
 * @description
 * 在包括的元素内点击产生水波效果
 * @param {string} url 背景图片地址
 */

import React, { PureComponent, ReactChild, createRef, MouseEvent, RefObject } from 'react'

interface Props {
  url: string
}

class WaterWave extends PureComponent<Props, {}> {
  public eleRef: RefObject<HTMLDivElement>

  public constructor(props: Props) {
    super(props)
    this.eleRef = createRef()
    this.handleClick = this.handleClick.bind(this)
  }

  public handleClick(eve: MouseEvent): void {
    const { eleRef } = this
    if (!eleRef.current) return
    // if (eve.target !== eve.currentTarget) return
    // 针对首页的使用情况
    if ((eve.target as HTMLElement).tagName !== 'CANVAS') return
    const top = eve.pageY - 80
    const left = eve.pageX - 80
    const { url } = this.props
    let children: HTMLDivElement
    const waveWrapper = document.createElement('div')
    waveWrapper.classList.add('wave-wrapper')
    waveWrapper.style.top = `${top}px`
    waveWrapper.style.left = `${left}px`
    for (let i = 0; i < 5; i++) {
      children = document.createElement('div')
      children.classList.add('wave')
      children.style.backgroundImage = `url(${url})`
      waveWrapper.appendChild(children)
    }
    eleRef.current.appendChild(waveWrapper)
    setTimeout(() => eleRef.current && eleRef.current.removeChild(waveWrapper), 1600)
  }

  public render(): ReactChild {
    const { eleRef, handleClick } = this
    const { children, url } = this.props

    return (
      <div
        ref={eleRef}
        className="wave-container"
        style={{ backgroundImage: `url(${url})` }}
        onClick={eve => handleClick(eve)}
      >
        {children}
      </div>
    )
  }
}

export default WaterWave
