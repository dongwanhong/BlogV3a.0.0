/**
 * @description
 * 在给定的元素上模拟下雨
 * @param {RefObject<HTMLCanvasElement>} ele 必需，画布元素对应的 ref 对象
 * @param {number} width 可选的，画布的宽度，默认为屏幕可视区域宽度
 * @param {number} height 可选的，画布的高度，默认为屏幕可视区域高度
 */

import { DefaultConfig, Config, ResultConfig, WaterDrop, Droplet } from './types'
import util from '../util'

const defaultConfig: DefaultConfig = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
  color: 'rgb(255, 255, 255)',
  skyColor: 'rgba(161, 189, 241, 0.4)',
  count: 50, // 同时存在的雨滴数
  tally: 5 // 水花基数
}

class Rain {
  public config: ResultConfig // 最终的配置对象
  public ctx: CanvasRenderingContext2D | null // 取得的 2D 上下文对象
  public waterDrops: WaterDrop[] // 水滴数组，存储所有的水滴
  public requestID: number // 动画请求 ID，一个非零整数
  public droplets: Droplet[] // 水滴数组，存储打击地面产生的水滴

  public constructor(config: Config) {
    this.ctx = null
    this.requestID = 0
    this.waterDrops = []
    this.droplets = []
    this.config = Object.assign({}, defaultConfig, config)
    // 为方法绑定执行上下文
    this.init = this.init.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.reboot = util.throttle(this.reboot.bind(this))
    this.animation = this.animation.bind(this)
    this.createCanvas = this.createCanvas.bind(this)
    this.drawSky = this.drawSky.bind(this)
    this.clearSky = this.clearSky.bind(this)
    this.addWaterDrops = this.addWaterDrops.bind(this)
    this.moveWaterDrops = this.moveWaterDrops.bind(this)
    this.createDroplets = this.createDroplets.bind(this)
    this.moveDroplets = this.moveDroplets.bind(this)
    this.destory = this.destory.bind(this)
    // 绑定 resize 事件
    window.addEventListener('resize', this.reboot)
    // 初始化
    this.init()
  }

  /**
   * @description
   * 初始化动画的相关信息
   * @returns {void}
   */
  protected init(): void {
    this.createCanvas()
  }

  /**
   * @description
   * 开始执行动画
   * @returns {void}
   */
  public start(): void {
    const { animation } = this
    this.requestID = requestAnimationFrame(animation)
  }

  /**
   * @description
   * 停止动画
   * @returns {void}
   */
  public stop(): void {
    const { requestID } = this
    cancelAnimationFrame(requestID)
  }

  /**
   * @description
   * 重启
   * @returns {void}
   */
  public reboot(): void {
    const { stop, start, config } = this
    config.width = document.documentElement.clientWidth
    config.height = document.documentElement.clientHeight
    stop()
    start()
  }

  /**
   * @description
   * 包含动画中的主要动作
   * @returns {void}
   */
  protected animation(): void {
    const { start, addWaterDrops, moveWaterDrops, moveDroplets } = this
    addWaterDrops()
    moveWaterDrops() // 其内部调用 createDroplets
    moveDroplets()
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
   * 创建雨点，包括纵坐标、横坐标、长度、下落速度、是否已经产生水花、是否达到边界的标志位
   * @returns {void}
   */
  protected addWaterDrops(): void {
    const { waterDrops } = this
    const { random } = util
    const { width, count } = this.config
    const rainInfo: WaterDrop = {
      x: random(-200, width),
      y: random(-100, 0),
      angle: 20,
      vy: random(1, 2, 1),
      length: random(15, 25),
      boom: false,
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
    const { ctx, waterDrops, createDroplets, drawSky, clearSky } = this
    const { color, width, height } = this.config
    if (!ctx) return
    // 擦去上一屏的雨滴
    clearSky()
    drawSky()
    ctx.strokeStyle = color
    util.forEachRight<WaterDrop>(
      waterDrops,
      (rain: WaterDrop): void => {
        const index = waterDrops.indexOf(rain)
        const radian = (rain.angle * Math.PI) / 180
        const bottom = rain.y + rain.length * Math.cos(radian)
        const left = rain.x + rain.length * Math.sin(radian)
        // 移除尾部边界标志位为真的雨滴
        if (rain.die) {
          waterDrops.splice(index, 1)
        }
        // 如果雨滴尾部到达边界则将标志位设为真
        if (rain.x > width || rain.y > height) {
          rain.die = true
        }
        // 如果雨滴头部到达边界且为产生过水花则产生水花
        // if (left > width && !rain.boom) {
        //   createDroplets(true, bottom, rain)
        // }
        if (bottom > height && !rain.boom) {
          createDroplets(false, left, rain)
        }
        // 绘制雨滴
        ctx.beginPath()
        ctx.moveTo(rain.x, rain.y)
        ctx.lineTo(left, bottom)
        ctx.stroke()
        // 计算雨滴下一屏的位置
        rain.x += rain.vy * Math.tan(radian)
        rain.y += rain.vy
      }
    )
  }

  /**
   * @description
   * 绘制水花
   * @param {boolean} isX 是否是横向导致爆炸
   * @param {number} end 爆炸点
   * @param {WaterDrop} rain 雨滴信息
   * @returns {void}
   */
  protected createDroplets(isX: boolean, end: number, rain: WaterDrop): void {
    rain.boom = true
    const { random } = util
    const { width, height, tally } = this.config
    let count = rain.vy * tally
    while (count > 0) {
      const x = isX ? width : end
      const y = isX ? end : height
      const droplet: Droplet = {
        oriX: x, // 爆炸点横坐标
        oriY: y, // 爆炸点纵坐标
        currentX: x, // 当前水花元素所在横坐标
        currentY: y, // 当前水花元素所在纵坐标
        r: random(2, 3, 1), // 水花半径
        R: rain.length, // 水花存在的区域
        vy: random(rain.vy / 4, rain.vy / 2, 1), // 水花移动的速度
        angle: random(-135, 45), // 移动时倾斜的角度
        isX: isX, // 是否是纵向引起的爆炸
        die: false // 移除标志位
      }
      this.droplets.push(droplet)
      count--
    }
  }

  /**
   * @description
   * 绘制爆炸后水滴的移动和移除
   * @param {Droplet} 产生的水滴信息
   * @returns {void}
   */
  protected moveDroplets(): void {
    const { ctx, droplets } = this
    const { random } = util
    const { color } = this.config
    const PI = Math.PI
    if (!ctx) return
    ctx.strokeStyle = color
    util.forEachRight(
      droplets,
      (droplet: Droplet): void => {
        const radian = (droplet.angle * PI) / 180
        const index = droplets.indexOf(droplet)
        // 清除已亡水花元素
        if (droplet.die) {
          droplets.splice(index, 1)
        }
        // 当水花移除到以长度为半径的范围时则使移除标记为真
        const differ =
          Math.pow(droplet.oriX - droplet.currentX, 2) +
          Math.pow(droplet.oriY - droplet.currentY, 2)
        const distance = Math.sqrt(differ)
        if (distance > droplet.R) {
          droplet.die = true
        }
        // 绘制水花（部分园）
        ctx.beginPath()
        ctx.arc(
          droplet.currentX,
          droplet.currentY,
          droplet.r,
          random(0.5 * PI, PI),
          random(PI, 2 * PI)
        )
        ctx.stroke()
        // 计算下一次水花，初始爆炸时以不同的角度移动
        if (droplet.vy > 0) {
          droplet.currentX = droplet.currentX + droplet.vy * Math.tan(radian)
          droplet.currentY = droplet.currentY - droplet.vy
        } else {
          // 当开始下降时则不需要倾斜角度，直接垂直降落
          droplet.currentY = droplet.currentY - droplet.vy
        }
        droplet.vy -= 0.01
      }
    )
  }

  /**
   * @description
   * 移除绑定在 window 对象上的 resize 事件
   * @returns {void}
   */
  public destory(): void {
    window.removeEventListener('resize', this.reboot)
  }
}

export default Rain
