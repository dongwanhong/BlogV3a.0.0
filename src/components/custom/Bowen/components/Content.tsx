import React, { SFC } from 'react'

const Content: SFC<{}> = props => {
  const { children } = props

  return <section>{children}</section>
}

export default Content
