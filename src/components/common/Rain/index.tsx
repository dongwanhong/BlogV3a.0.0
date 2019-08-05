import React, { PureComponent, ReactChild, RefObject, createRef } from 'react'
import util, { Rain as RainFun, RainType } from '../../../utils'

type Props = Omit<RainType.Config, 'ele'>

class Rain extends PureComponent<Props, {}> {
  public eleRef: RefObject<HTMLCanvasElement>
  public rain: RainType.RainType | undefined

  public constructor(props: Props) {
    super(props)
    this.eleRef = createRef()
  }

  public componentDidMount(): void {
    const { isUndefined } = util
    const { width, height, color, skyColor, count, tally } = this.props
    const config: RainType.Config = {
      ele: this.eleRef
    }
    !isUndefined(width) && (config.width = width)
    !isUndefined(height) && (config.height = height)
    !isUndefined(color) && (config.color = color)
    !isUndefined(skyColor) && (config.skyColor = skyColor)
    !isUndefined(count) && (config.count = count)
    !isUndefined(tally) && (config.tally = tally)
    this.rain = new RainFun(config)
    this.rain.start()
  }

  public componentWillUnmount(): void {
    this.rain && this.rain.destory()
  }

  public render(): ReactChild {
    const { eleRef } = this
    return <canvas ref={eleRef}>Sorry, your browser does not support HTML5 canvas tags.</canvas>
  }
}

export default Rain
