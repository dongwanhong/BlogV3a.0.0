import React, { SFC } from 'react'

interface Props {
  text?: string | boolean
}

const BlockUI: SFC<Props> = props => {
  const { text } = props
  let retText: string | undefined = '正在加载 ...'
  if (typeof text === 'boolean') {
    if (!text) retText = ''
  } else {
    retText = text
  }

  return (
    <div className="block-ui">
      <div className="shadow-layer" />
      <div className="content">
        <div className="ball-container">
          <div className="spin-item" />
          <div className="spin-item" />
          <div className="spin-item" />
          <div className="spin-item" />
          <div className="spin-item" />
          <div className="spin-item" />
          <div className="spin-item" />
          <div className="spin-item" />
        </div>
        <div className="message">{retText}</div>
      </div>
    </div>
  )
}

export default BlockUI
