import React, { Component, ReactChild } from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import utils from '@/utils'

export interface TagInfo {
  id: string | number
  text: string
  active?: boolean
  disabled?: boolean
  intlId?: string
  // [prop: string]: string | number | boolean | undefined | number[]
}

interface OwnProps {
  tags: TagInfo[]
  className?: string
  onChange?: (tag: TagInfo) => void
}

type Props = OwnProps & WrappedComponentProps

class Tag extends Component<Props, {}> {
  public constructor(props: Props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  public componentDidMount(): void {
    const { tags } = this.props
    tags.forEach(item => {
      if (utils.isUndefined(item.active)) {
        item.active = false
      }
    })
  }

  protected handleClick(tag: TagInfo): void {
    const { onChange } = this.props
    // const { tags } = this.props
    // tags.forEach(item => ((item.active as boolean) = false))
    // tag.active = true
    if (utils.isFunction(onChange) && !tag.disabled) {
      ;(onChange as Function)(tag)
    }
  }

  public render(): ReactChild {
    const { handleClick } = this
    const { tags, intl, className } = this.props

    return (
      <ul className={`tag-container ${className ? className : ''}`}>
        {tags.map(item => {
          const classNames = ['tag-item']
          if (item.active) {
            classNames.push('active')
          }
          if (item.disabled) {
            classNames.push('disabled')
          }
          return (
            <li key={item.id} className={classNames.join(' ')} onClick={() => handleClick(item)}>
              {item.intlId ? intl.formatMessage({ id: item.intlId }) : item.text}
            </li>
          )
        })}
      </ul>
    )
  }
}

export default injectIntl(Tag)
