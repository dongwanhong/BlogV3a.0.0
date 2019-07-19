import React, { PureComponent, ReactNode } from 'react'

export interface Props {
  height?: number
}

class PageItem extends PureComponent<Props> {
  public render(): ReactNode {
    const { height, children } = this.props

    return (
      <div className="page-item" style={{ height }}>
        {children}
      </div>
    )
  }
}

export default PageItem
