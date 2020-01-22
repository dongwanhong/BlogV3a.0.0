/**
 * @description
 * 模拟 3D 球体，跟随鼠标旋转。
 * 1、随机产生均匀分布的坐标
 *   θ = arccos( ((2 * num) - 1) / all - 1)
 *   Φ = θ * sqrt(all * π)
 *   x = r * sinθ * cosΦ
 *   y = r * sinθ * sinΦ
 *   z = r * cosθ
 * 2、竖轴越小则透明度大小和层叠值都相应越小，以产生立体效果
 * 3、默认以一定的方向旋转
 *   x' = cosθ * x - sinθ * y
 *   y' = cosθ * y + sinθ * x
 * 4、绑定鼠标事件，根据鼠标位置决定方向，且距离圆心越近旋转的速度慢
 */

import React, { PureComponent, ReactChild, createRef, RefObject } from 'react'
import TagItem from './components/TagItem'
import utils from '../../../utils'

const { throttle } = utils

export interface Coordinate {
  x: number
  y: number
  z: number
}

type Coordinates = Coordinate[]

interface ExtraConfig {
  count: number
  radius: number
  angleX: number
  angleY: number
}

type Config = Required<Props> & ExtraConfig

interface CircleCenter {
  x: number
  y: number
}

interface Props {
  width?: number
  height?: number
}

interface State {
  coordinates: Coordinates
}

class TagBall extends PureComponent<Props, State> {
  public static TagItem = TagItem
  public config: Config
  public requestId: number
  public ele: RefObject<HTMLDivElement>

  public state: State = {
    coordinates: []
  }

  public constructor(props: Props) {
    super(props)
    this.ele = createRef()
    this.requestId = 0
    this.rotateX = this.rotateX.bind(this)
    this.rotateY = this.rotateY.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.destory = this.destory.bind(this)
    this.getAngle = throttle(this.getAngle.bind(this), 4)
    this.handleConfig = this.handleConfig.bind(this)
    this.getCircleCenter = this.getCircleCenter.bind(this)
    this.getRandomCoordinates = this.getRandomCoordinates.bind(this)
    this.config = this.handleConfig()
  }

  public componentDidMount(): void {
    this.getRandomCoordinates()
    this.start()
    this.ele.current && this.ele.current.addEventListener('mousemove', this.getAngle)
  }

  public componentWillUnmount(): void {
    this.stop()
    this.destory()
  }

  /**
   * @description
   * 获取和处理配置信息
   * @returns {void}
   */
  protected handleConfig(): Config {
    let { width = 300, height = 300, children } = this.props
    // 减去外部容器左右各有 15 像素的内边距
    // （结合实际减去了更多）防止内容溢出
    width = width - 64
    // 将半径缩小以将每一项显示完全
    const radius = Math.min(width, height) / 2 - 33
    const count = React.Children.count(children)
    return {
      count,
      radius,
      angleX: 0.005,
      angleY: 0.005,
      width: width,
      height: height
    }
  }

  /**
   * @description
   * 根据子类个数为其创建随机坐标
   * @returns {void}
   */
  protected getRandomCoordinates(): void {
    const coordinates: Coordinates = []
    const { count, radius } = this.config
    for (let i = 0; i < count; i++) {
      // 生产 [-1, 1] 间的等差数列，再利用反余弦函数求出角度
      const theta = Math.acos((2 * i) / count - 1)
      // ???
      const phi = theta * Math.sqrt(count * Math.PI)
      const coordinate: Coordinate = {
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta)
      }
      coordinates.push(coordinate)
    }
    this.setState({ coordinates })
  }

  /**
   * @description
   * 绕横轴旋转时更新坐标
   * @param {number} angle 旋转角度
   * @returns {void}
   */
  protected rotateX(angle: number): void {
    const { coordinates } = this.state
    const newCoordinates = [...coordinates]
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    newCoordinates.forEach(coordinate => {
      const { y, z } = coordinate
      coordinate.y = y * cos - z * sin
      coordinate.z = y * sin + z * cos
    })
    this.setState(() => ({ coordinates: newCoordinates }))
  }

  /**
   * @description
   * 绕纵轴旋转时更新坐标
   * @param {number} angle 旋转角度
   * @returns {void}
   */
  protected rotateY(angle: number): void {
    const { coordinates } = this.state
    const newCoordinates = [...coordinates]
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    newCoordinates.forEach(coordinate => {
      const { z, x } = coordinate
      coordinate.z = z * cos - x * sin
      coordinate.x = z * sin + x * cos
    })
    this.setState(() => ({ coordinates: newCoordinates }))
  }

  /**
   * @description
   * 获取圆心位置
   * @returns {CircleCenter} 圆心位置
   */
  protected getCircleCenter(): CircleCenter {
    const circleCenter = {
      x: 0,
      y: 0
    }
    const { ele } = this
    const { width, height } = this.config
    if (ele.current) {
      const rectObject = ele.current.getBoundingClientRect()
      circleCenter.x = rectObject.left + width / 2
      circleCenter.y = rectObject.top + height / 2
    }
    return circleCenter
  }

  /**
   * @description
   * 响应鼠标事件
   * @param {MouseEvent} eve 鼠标事件对象
   * @returns {void}
   */
  protected getAngle(eve: MouseEvent): void {
    const { config, getCircleCenter } = this
    const circleCenter = getCircleCenter()
    config.angleX = (eve.clientX - circleCenter.x) * -0.0001
    config.angleY = (eve.clientY - circleCenter.y) * 0.0001
  }

  /**
   * @description
   * 开始旋转
   * @returns {void}
   */
  public start(): void {
    const { start, rotateX, rotateY, config } = this
    const { angleX, angleY } = config
    this.requestId = requestAnimationFrame(() => {
      rotateX(angleX)
      rotateY(angleY)
      start()
    })
  }

  /**
   * @description
   * 停止动画
   * @returns {void}
   */
  public stop(): void {
    const { requestId } = this
    cancelAnimationFrame(requestId)
  }

  /**
   * @description
   * 移除绑定 window 上的鼠标事件
   * @returns {void}
   */
  public destory(): void {
    this.ele.current && this.ele.current.removeEventListener('mousemove', this.getAngle)
  }

  public render(): ReactChild {
    const { ele } = this
    const { children } = this.props
    const { coordinates } = this.state
    const { radius, width, height } = this.config
    const styles = {
      width: `${width}px`,
      height: `${height}px`
    }

    return (
      <div ref={ele} style={styles} className="ball-wrapper">
        {React.Children.map(children, (oChildren, index) => {
          const coordinate = coordinates[index]
          const config = { coordinate, radius }
          return React.isValidElement(oChildren) ? React.cloneElement(oChildren, config) : null
        })}
      </div>
    )
  }
}

export { TagBall, TagItem }
