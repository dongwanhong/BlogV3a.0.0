import React, { SFC } from 'react'
import config from '../config'

function toTopCore(step: number): void {
  const ele = document.querySelector('#bowen')
  if (!ele) return
  const scrollTop = ele.scrollTop
  if (scrollTop > 0) {
    ele.scrollTop -= step
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    toTop(step)
  }
}

function toTop(step: number): void {
  requestAnimationFrame(() => toTopCore(step))
}

const ToTop: SFC<{}> = props => {
  return (
    <div id="fixed-tools">
      <div className="backtop" onClick={() => toTop(config.step)}>
        回到顶部
      </div>
    </div>
  )
}

export default ToTop
