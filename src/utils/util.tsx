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
  public throttle(method: Function, delay: number, context?: object): () => void {
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
    if (precision === 0) {
      return Math.round(ret)
    }
    return Math.round(ret * 10 ** precision) / precision
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
}

export default new Utils()
