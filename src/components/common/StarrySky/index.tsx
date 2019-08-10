import React, { PureComponent, RefObject, createRef, ReactChild } from 'react'
import util, { StarrySky as StarrySkyFun, StarrySkyType } from '../../../utils'

type props = Omit<StarrySkyType.Config, 'ele'>

class StarrySky extends PureComponent<props, {}> {
  public eleRef: RefObject<HTMLCanvasElement>
  public starrySky: StarrySkyType.StarrySkyType | undefined

  public constructor(props: props) {
    super(props)
    this.eleRef = createRef()
  }

  public componentDidMount(): void {
    const { isUndefined } = util
    const { width, height, color, lineColor, skyColor, count, length, easingFactor } = this.props
    const config: StarrySkyType.Config = {
      ele: this.eleRef
    }
    !isUndefined(width) && (config.width = width)
    !isUndefined(height) && (config.height = height)
    !isUndefined(color) && (config.color = color)
    !isUndefined(skyColor) && (config.skyColor = skyColor)
    !isUndefined(count) && (config.count = count)
    !isUndefined(lineColor) && (config.lineColor = lineColor)
    !isUndefined(length) && (config.length = length)
    !isUndefined(easingFactor) && (config.easingFactor = easingFactor)
    this.starrySky = new StarrySkyFun(config)
  }

  public componentWillUnmount(): void {
    this.starrySky && this.starrySky.destory()
  }

  public render(): ReactChild {
    const { eleRef } = this
    return <canvas ref={eleRef}>Sorry, your browser does not support HTML5 canvas tags.</canvas>
  }
}

export default StarrySky
