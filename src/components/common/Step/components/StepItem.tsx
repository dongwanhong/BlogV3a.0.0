import React, { Component, ReactNode } from 'react'
import { setActiveStepType } from '../index'

interface Props {
  title?: string
  description?: string
  index?: number
  activeIndex?: number
  setActiveStep?: setActiveStepType
}

class StepItem extends Component<Props, {}> {
  public render(): ReactNode {
    const { title, description, index = 0, activeIndex = 0, setActiveStep = () => {} } = this.props
    let classNames = 'step-item'

    if (index === activeIndex && !classNames.includes('active')) {
      classNames += ' active'
    }

    return (
      <>
        <div
          onClick={() => {
            setActiveStep(index)
          }}
          className={classNames}
        >
          <div className="title">{title}</div>
          <div className="text">{description}</div>
        </div>
      </>
    )
  }
}

export default StepItem
