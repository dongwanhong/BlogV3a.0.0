/**
 * @description
 * 指定每条步骤的提示信息，当 extra 为真时标题和描述都无效
 * @param {string} title 可选的，标题
 * @param {string} description 可选的，对步骤的详情描述
 */

import React, { Component, ReactNode } from 'react'

interface Props {
  title?: string
  description?: string
  index?: number
  activeIndex?: number
  extra?: boolean
  onChange?: (index: number) => void
}

class StepItem extends Component<Props, {}> {
  public render(): ReactNode {
    const {
      title,
      description,
      index = 0,
      activeIndex = 0,
      extra,
      onChange = () => {}
    } = this.props
    let classNames = 'step-item'

    if (index === activeIndex) {
      if (extra) {
        classNames.replace(/done/, '')
        !classNames.includes('active') && (classNames += ' active')
      } else {
        classNames.replace(/active/, '')
        !classNames.includes('done') && (classNames += ' done')
      }
    }

    return (
      <div className={classNames} onClick={() => onChange(index)}>
        {extra ? null : (
          <>
            <div className="title">{title}</div>
            <div className="text">{description}</div>
          </>
        )}
      </div>
    )
  }
}

export default StepItem
