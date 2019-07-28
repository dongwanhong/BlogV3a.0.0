/**
 * @description
 * 传递可选参数控制步骤组件的显示样式
 * @param {'circle' | 'strip'} mode 可选的，步骤条的显示样式，默认为 'circle' 圆点显示
 * @param {'vertical' | 'horizontal'} direction 可选的，设置步骤条的显示方向，默认为 ’horizontal‘ 水平放置
 * @param {'color' | 'number' | 'all'} content 可选的，在 'circle' 模式，指定圆圈中以数字或颜色填充，默认为数字
 * @param {boolean} line 可选的，是否添加横线，只在 'circle' 模式下的水平布局下的非单点高亮有效
 * @param {boolean} extra 可选的，配合在 content 为 'color' 的模式下进行单点高亮
 * @param {number} activeIndex 可选的，当前所处步骤，默认为第一步
 * @param {(index: number) => void} onChange 可选的，点击每一步时执行的函数，参数为点击的步数，以零开始
 */

import React, { PureComponent, ReactNode } from 'react'
import StepItem from './components/StepItem'

interface Props {
  activeIndex?: number
  mode?: 'circle' | 'strip'
  direction?: 'vertical' | 'horizontal'
  content?: 'color' | 'number' | 'all'
  line?: boolean
  extra?: boolean
  onChange?: (index: number) => void
}

class Step extends PureComponent<Props, {}> {
  public static StepItem = StepItem

  public getIndex(count: number, activeIndex: number | undefined): number {
    const tempIndex = Number(activeIndex)
    if (tempIndex < 0) {
      return 0
    }
    if (tempIndex + 1 > count) {
      return count - 1
    }
    return tempIndex
  }

  public render(): ReactNode {
    const {
      children,
      mode = 'strip',
      direction = 'horizontal',
      content,
      line,
      extra,
      activeIndex,
      onChange
    } = this.props
    const classNames: (number | string | undefined)[] = [mode, direction, 'step-wrapper']
    const count = React.Children.count(children)
    const { getIndex } = this

    if (content === 'all') {
      classNames.concat(['color', 'number'])
    } else {
      classNames.push(content)
    }

    if (mode === 'circle' && direction === 'horizontal' && line && !extra) {
      classNames.push('line')
    }

    if (extra) {
      classNames.push('dot')
    }

    return (
      <div
        className={classNames
          .join(' ')
          .trim()
          .replace(/\s{2,}/, ' ')}
      >
        {React.Children.map(children, (oChildren, index) =>
          React.isValidElement(oChildren)
            ? React.cloneElement(oChildren, {
                index,
                activeIndex: getIndex(count, activeIndex),
                extra,
                onChange
              })
            : null
        )}
      </div>
    )
  }
}

export { Step, StepItem }
