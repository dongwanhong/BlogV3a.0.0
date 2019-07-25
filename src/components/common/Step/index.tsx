/**
 * @description
 * 传递可选参数控制步骤组件的显示样式
 * @param {'circle' | 'strip'} mode 可选的，步骤条的显示样式，默认为 'circle' 圆点显示
 * @param {'vertical' | 'horizontal'} direction 可选的，设置步骤条的显示方向，默认为 ’horizontal‘ 水平放置
 * @param {'color' | 'number' | 'all'} content 可选的，在 'circle' 模式，指定圆圈中以数字或颜色填充，默认为数字
 * @param {boolean} line 可选的，是否添加横线，只在 'circle' 模式下的水平布局下的非单点高亮有效
 * @param {boolean} extra 可选的，配合在 content 为 'color' 的模式下进行单点高亮
 */

import React, { PureComponent, ReactNode } from 'react'
import StepItem from './components/StepItem'

type modeType = 'circle' | 'strip'
type contentType = 'color' | 'number' | 'all'
type directionType = 'vertical' | 'horizontal'
export type setActiveStepType = (index: number) => void

interface Props {
  mode?: modeType
  direction?: directionType
  content?: contentType
  line?: boolean
  extra?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (index: number) => any
}

interface State {
  activeIndex: number
}

class Step extends PureComponent<Props, State> {
  public static StepItem = StepItem
  public state = {
    activeIndex: 0
  }

  public constructor(props: Props) {
    super(props)
    this.setActiveStep = this.setActiveStep.bind(this)
  }

  public setActiveStep: setActiveStepType = (index: number): void => {
    const { onChange } = this.props
    const { activeIndex } = this.state
    if (activeIndex === index) {
      if (onChange) {
        onChange(index)
      }
      return
    }
    this.setState(
      () => ({ activeIndex: index }),
      () => {
        if (onChange) {
          onChange(index)
        }
      }
    )
  }

  public render(): ReactNode {
    const { setActiveStep } = this
    const { children, mode = 'circle', content, direction = 'horizontal', line, extra } = this.props
    const { activeIndex } = this.state
    const classNames: (number | string | undefined)[] = [mode, direction, 'step-wrapper']

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
            ? React.cloneElement(oChildren, { index, activeIndex, setActiveStep, extra })
            : null
        )}
      </div>
    )
  }
}

export { Step, StepItem }
