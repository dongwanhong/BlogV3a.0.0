import { ComponentType } from 'react'

class Utils {
  /**
   * @description
   * 获取指定组件的显示名称
   * @param {ComponentType<T>} component 目标组件
   * @returns {string} 组件的显示名称
   */
  public getComponentName<T>(component: ComponentType<T>): string {
    return component.displayName || component.name || 'Component'
  }

  /**
   * @description
   * 根据包裹的组件对高阶组件设置显示名称
   * @param {ComponentType<T>} hocComponent 高阶组件
   * @param {ComponentType<T>} WrappedComponent 包裹组件
   * @returns {void}
   */
  public setHocComponentName<T, S>(
    hocComponent: ComponentType<T>,
    WrappedComponent: ComponentType<S>
  ): void {
    hocComponent.displayName = `${this.getComponentName(hocComponent)}(${this.getComponentName(
      WrappedComponent
    )})`
  }

  /**
   * @description
   * 节流函数
   * @param {Function} method 需要执行的函数
   * @param {number} delay 延迟执行的时间
   * @param {object} context 函数执行的环境
   * @returns {Function} 包装后的函数
   */
  public throttle(method: Function, delay: number = 1000, context?: object): () => void {
    let wait = false
    return function(): void {
      if (!wait) {
        method.apply(context, arguments)
        wait = true
        setTimeout(() => {
          wait = false
        }, delay)
      }
    }
  }

  /**
   * @description
   * 获取指定范围内的随机数
   * @param {number} min 最小下限
   * @param {number} max 最大上限
   * @param {number} precision 精度，默认为整数
   */
  public random(min: number, max: number, precision: number = 0): number {
    const ret = Math.random() * (max - min) + min
    const divisor = 10 ** precision
    if (precision === 0) {
      return Math.round(ret)
    }
    return Math.round(ret * divisor) / divisor
  }

  /**
   * @description
   * 反向遍历数组
   * @param array 需要被遍历的数组
   * @param iteratee 遍历时执行的函数
   * @param context 可选的。传递给函数的 "this" 值，默认为 undefined
   * @returns {void}
   */
  public forEachRight<T>(array: T[], iteratee: Function, context?: object): void {
    let length = array.length
    while (length--) {
      iteratee.call(context, array[length], length, array)
    }
  }

  /**
   * @description
   * 判断传入的值是否是 undefined
   * @param {any} value 需要被检测的值
   * @returns {boolean}
   */
  public isUndefined<T>(value: T): boolean {
    return value === undefined
  }

  /**
   * 以(x,y)为圆心绘制一条弧线
   * @param {CanvasRenderingContext2D} ctx 2D上下文，必需的
   * @param {number} x 可选的，圆心横坐标
   * @param {number} y 可选的，圆心纵坐标
   * @param {number} radius 可选的，半径
   * @param {number} m 可选的，起始角度(用弧度表示)
   * @param {number} n 可选的，结束角度(用弧度表示)
   * @param {boolean} counterclockwise 可选的，是否按逆时针方向计算
   * @returns {void}
   */
  public drawCircle(
    ctx: CanvasRenderingContext2D,
    x = 0,
    y = 0,
    radius = 5,
    m = 0,
    n = 2 * Math.PI,
    counterclockwise = false
  ): void {
    ctx.beginPath()
    ctx.arc(x, y, radius, m, n, counterclockwise)
    ctx.fill()
  }

  /**
   * @description
   * 绘制直线
   * @param {CanvasRenderingContext2D} ctx 2D上下文，必需的
   * @param {number} x 起始横坐标
   * @param {number} y 起始纵坐标
   * @param {number} m 节点横坐标
   * @param {number} n 节点纵坐标
   * @returns {void}
   */
  public drawLine(ctx: CanvasRenderingContext2D, x = 0, y = 0, m = 0, n = 0): void {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(m, n)
    ctx.stroke()
  }

  /**
   * @description
   * 检测输入的值是否是函数
   * @param {any} value 被检测的值
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isFunction(value: any): boolean {
    return typeof value === 'function'
  }
}

export default new Utils()
