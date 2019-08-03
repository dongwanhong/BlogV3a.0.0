/**
 * @description
 * 在给定的元素上模拟下雨
 * @param {RefObject<HTMLCanvasElement>} ele 必需，画布元素对应的 ref 对象
 * @param {number} width 可选的，画布的宽度，默认为屏幕可视区域宽度
 * @param {number} height 可选的，画布的高度，默认为屏幕可视区域高度
 */

import { DefaultConfig, Config, ResultConfig, WaterDrop } from './types'
import util from '../util'

const defaultConfig: DefaultConfig = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
  color: 'rgba(255, 0, 0, 1)',
  skyColor: 'rgba(161, 189, 241, 0.4)',
  count: 1 // 同时存在的雨滴数
}

class Rain {
  public config: ResultConfig // 最终的配置对象
  public ctx: CanvasRenderingContext2D | null // 取得的 2D 上下文对象
  public waterDrops: WaterDrop[] // 水滴数组，存储所有的水滴
  public requestID: number // 动画请求 ID，一个非零整数

  public constructor(config: Config) {
    this.ctx = null
    this.requestID = 0
    this.waterDrops = []
    this.config = Object.assign({}, defaultConfig, config)
    this.init = this.init.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animation = this.animation.bind(this)
    this.createCanvas = this.createCanvas.bind(this)
    this.drawSky = this.drawSky.bind(this)
    this.clearSky = this.clearSky.bind(this)
    this.addWaterDrops = this.addWaterDrops.bind(this)
    this.moveWaterDrops = this.moveWaterDrops.bind(this)
    this.init()
  }

  /**
   * @description
   * 初始化动画的相关信息
   * @returns {void}
   */
  protected init(): void {
    this.createCanvas()
    this.drawSky()
    this.addWaterDrops()
    this.start()
  }

  /**
   * @description
   * 开始执行动画
   * @returns {void}
   */
  protected start(): void {
    const { animation } = this
    this.requestID = requestAnimationFrame(animation)
  }

  /**
   * @description
   * 停止动画
   * @returns {void}
   */
  protected stop(): void {
    const { requestID } = this
    cancelAnimationFrame(requestID)
  }

  /**
   * @description
   * 包含动画中的主要动作
   * @returns {void}
   */
  protected animation(): void {
    const { start, moveWaterDrops } = this
    moveWaterDrops()
    start()
  }

  /**
   * @description
   * 绘制画布
   * @returns {void}
   */
  protected createCanvas(): void {
    const { ele, width, height } = this.config
    if (!ele || !ele.current || !ele.current.getContext) return
    this.ctx = ele.current.getContext('2d')
    ele.current.width = width
    ele.current.height = height
  }

  /**
   * @description
   * 绘制天空
   * @returns {void}
   */
  protected drawSky(): void {
    const { ctx } = this
    const { width, height, skyColor } = this.config
    if (!ctx) return
    ctx.fillStyle = skyColor
    ctx.fillRect(0, 0, width, height)
  }

  /**
   * @description
   * 清空天空
   * @returns {void}
   */
  protected clearSky(): void {
    if (!this.ctx) return
    const { width, height } = this.config
    this.ctx.clearRect(0, 0, width, height)
  }

  /**
   * @description
   * 创建雨点，包括纵坐标、横坐标、长度、下落速度、是否达到边界的标志位
   * @returns {void}
   */
  protected addWaterDrops(): void {
    const { waterDrops } = this
    const { width, count } = this.config
    const rainInfo: WaterDrop = {
      x: util.random(0, width),
      y: util.random(-100, 0),
      vx: util.random(0, 1),
      vy: util.random(0.5, 1),
      length: util.random(50, 100),
      die: false
    }
    if (waterDrops.length < count) {
      waterDrops.push(rainInfo)
    }
  }

  /**
   * @description
   * 绘制雨滴移动和移除
   * @returns {void}
   */
  protected moveWaterDrops(): void {
    const { ctx, waterDrops, createSpray } = this
    const { color, height } = this.config
    if (!ctx) return
    ctx.strokeStyle = color
    util.forEachRight<WaterDrop>(waterDrops, (rain: WaterDrop) => {
      const index = waterDrops.indexOf(rain)
      const bottom = rain.y + rain.length
      if (rain.die) {
        waterDrops.splice(index, 1)
      }
      if (bottom > height) {
        createSpray(rain)
      }
      ctx.beginPath()
      ctx.moveTo(rain.x, rain.y)
      ctx.lineTo(rain.x, bottom)
      ctx.stroke()
      rain.x += rain.vx
      rain.y += rain.vy
    })
  }

  /**
   * @description
   * 绘制水花
   * @param {WaterDrop} rain 水滴的相关信息
   * @returns {void}
   */
  protected createSpray(rain: WaterDrop): void {
    rain.die = true
  }
}

export default Rain
