/**
 * @description
 * 绘制星空图，星随你动
 */

import { DefaultConfig, Config, ResultConfig, Node, Edge } from './types'
import util from '../util'

const { random, drawCircle, drawLine, throttle } = util

const defaultConfig: DefaultConfig = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
  color: '#FFF',
  lineColor: '#FFF',
  skyColor: '#000',
  count: 20, // 点的个数
  length: 80, // 构成边的长度
  easingFactor: 5 // 缓动因子
}

class StarrySky {
  public config: ResultConfig
  public ctx: CanvasRenderingContext2D | null
  public requestID: number
  public nodes: Node[]
  public edges: Edge[]
  public mousePos: [number, number] // 鼠标所在坐标

  public constructor(config: Config) {
    this.ctx = null
    this.requestID = 0
    this.nodes = []
    this.edges = []
    this.mousePos = [0, 0]
    this.config = Object.assign({}, defaultConfig, config)
    // 给方法绑定 this 值
    this.init = this.init.bind(this)
    this.createCanvas = this.createCanvas.bind(this)
    this.drawSky = this.drawSky.bind(this)
    this.clearSky = this.clearSky.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animation = this.animation.bind(this)
    this.createNodes = this.createNodes.bind(this)
    this.getMousePosition = throttle(this.getMousePosition.bind(this), 4)
    this.drawNodes = this.drawNodes.bind(this)
    this.createEdges = this.createEdges.bind(this)
    this.drawEdges = this.drawEdges.bind(this)
    this.reboot = throttle(this.reboot.bind(this))
    this.destory = this.destory.bind(this)
    // 初始化
    this.init()
  }

  /**
   * @description
   * 初始化动画的相关信息
   * @returns {void}
   */
  protected init(): void {
    const { getMousePosition, start, createCanvas, createNodes, createEdges, reboot } = this
    const { ele } = this.config
    if (!ele.current) return
    // 绑定事件
    ele.current.addEventListener('mousemove', getMousePosition, false)
    window.addEventListener('resize', reboot)
    // 创建先决条件并启动
    createCanvas()
    createNodes()
    createEdges()
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
   * 包含动画中的主要动作
   * @returns {void}
   */
  protected animation(): void {
    const { start, drawNodes, drawEdges, drawSky, clearSky } = this
    clearSky()
    drawSky()
    drawNodes()
    drawEdges()
    start()
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
    ctx.globalAlpha = 1
    ctx.fillRect(0, 0, width, height)
  }

  /**
   * @description
   * 清除天空
   * @returns {void}
   */
  protected clearSky(): void {
    const { ctx } = this
    const { width, height } = this.config
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)
  }

  /**
   * @description
   * 创建点，包括坐标、横纵向移动速度、半径，以及是否跟随鼠标的标志位
   * @returns {void}
   */
  protected createNodes(): void {
    const { nodes } = this
    const { width, height, count } = this.config
    let node: Node
    let number = count
    while (number > 0) {
      node = {
        followMouse: !number, // 让创建的第最后个点跟随鼠标
        x: random(0, width),
        y: random(0, height),
        vx: random(-0.5, 0.5, 1),
        vy: random(-0.5, 0.5, 1),
        radius: random(1, 6)
      }
      nodes.push(node)
      number--
    }
  }

  /**
   * @description
   * 设置跟随鼠标点的坐标
   * @param {MouseEvent} eve 鼠标事件对象
   * @returns {void}
   */
  protected getMousePosition(eve: MouseEvent): void {
    if (!eve) return
    this.mousePos[0] = eve.clientX
    this.mousePos[1] = eve.clientY
  }

  /**
   * @description
   * 绘制点和点的移动
   * @returns {void}
   */
  protected drawNodes(): void {
    const { nodes, ctx, mousePos } = this
    const { color, width, height, easingFactor } = this.config
    if (!ctx) return
    nodes.forEach(
      (item: Node): void => {
        if (item.followMouse) return
        // 绘制
        ctx.fillStyle = color
        ctx.globalAlpha = item.radius / 6 // 半径与最大半径的比值
        drawCircle(ctx, item.x, item.y, item.radius)
        // 通过改变点的坐标来实现点的移动
        item.x += item.vx
        item.y += item.vy
        // 边界处理
        if (item.x < 0 || item.x > width) {
          item.vx *= -1
        }
        if (item.y < 0 || item.x > height) {
          item.vy *= -1
        }
      }
    )
    // 跟随鼠标的点缓动：x = x + (t - x) / factor(factor 是缓动因子，t 是最终位置，x 是当前位置)
    // 详见 https://link.jianshu.com?t=https://www.youtube.com/watch?v=ZfytHvgHybA
    nodes[0].x += (mousePos[0] - nodes[0].x) / easingFactor
    nodes[0].y += (mousePos[1] - nodes[0].y) / easingFactor
  }

  /**
   * @description
   * 创建边，包括边两端点信息
   * @returns {void}
   */
  protected createEdges(): void {
    const { nodes, edges } = this
    const { count } = this.config
    let ignore = true
    let item: Edge
    nodes.forEach(item1 => {
      nodes.forEach((item2, index) => {
        if (!ignore) {
          item = {
            from: item1,
            to: item2
          }
          edges.push(item)
        }
        if (item1 === item2) {
          ignore = false
        }
        if (index + 1 === count) {
          ignore = true
        }
      })
    })
  }

  /**
   * @description
   * 绘制边
   */
  protected drawEdges(): void {
    const { ctx, edges } = this
    const { length, lineColor } = this.config
    let len: number
    if (!ctx) return
    ctx.strokeStyle = lineColor
    edges.forEach(item => {
      len = Math.sqrt(Math.pow(item.from.x - item.to.x, 2) + Math.pow(item.from.y - item.to.y, 2))
      if (len <= length) {
        // 根据长度设置透明度和线条大小
        const ret = len / length
        ctx.lineWidth = ret
        ctx.globalAlpha = ret
        // 绘制
        drawLine(ctx, item.from.x, item.from.y, item.to.x, item.to.y)
      }
    })
  }

  /**
   * @description
   * 重启星空图
   * @returns {void}
   */
  protected reboot(): void {
    const { createCanvas, stop, start, config } = this
    config.width = document.documentElement.clientWidth
    config.height = document.documentElement.clientHeight
    stop()
    createCanvas()
    start()
  }

  /**
   * @description
   * 移除绑定到全局对象上的 resize 事件
   * @returns {void}
   */
  public destory(): void {
    const { reboot } = this
    window.removeEventListener('resize', reboot)
  }
}

export default StarrySky
