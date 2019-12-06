import React, { Component, ReactChild, RefObject, createRef } from 'react'
import util, { Rain as RainFun, RainType } from '../../../utils'

type Props = Omit<RainType.Config, 'ele'> & {
  running?: boolean
}

class Rain extends Component<Props, {}> {
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

  public shouldComponentUpdate(nextProps: Props): boolean {
    const { running } = this.props
    if (nextProps.running === running) {
      return false
    }
    return true
  }

  public componentWillUpdate(nextProps: Props): void {
    const { running } = nextProps
    if (!this.rain) {
      return
    }
    if (running) {
      this.rain.stop()
      this.rain.clearSky()
      return
    }
    this.rain.goOn()
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
