import React, { PureComponent, ReactNode } from 'react'
import StepItem from './components/StepItem'

type mode = 'line'
type content = 'color' | 'number'
type direction = 'vertical' | 'horizontal'
export type setActiveStepType = (index: number) => void

interface Props {
  mode?: mode
  direction?: direction
  content?: content
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
    const { children, mode, content = 'number', direction = 'horizontal' } = this.props
    const { activeIndex } = this.state
    const classNames = [mode, content, direction, 'step-wrapper']

    return (
      <div
        className={classNames
          .join(' ')
          .trim()
          .replace(/\s{2,}/, ' ')}
      >
        {React.Children.map(children, (oChildren, index) =>
          React.isValidElement(oChildren)
            ? React.cloneElement(oChildren, { index, activeIndex, setActiveStep })
            : null
        )}
      </div>
    )
  }
}

export { Step, StepItem }
