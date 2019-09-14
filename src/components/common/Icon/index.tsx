import React, { SFC } from 'react'

interface Props {
  icon: string
}

const Icon: SFC<Props> = props => {
  const { icon } = props

  return <i className={`iconfont ${icon}`} />
}

export default Icon
