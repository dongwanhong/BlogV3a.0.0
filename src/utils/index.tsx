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
}

export default new Utils()
