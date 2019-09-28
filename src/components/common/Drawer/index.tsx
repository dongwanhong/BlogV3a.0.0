import React, { SFC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition'

const classNames: CSSTransitionClassNames = {
  enter: 'animated',
  enterActive: 'slideInLeft',
  exit: 'animated',
  exitActive: 'slideOutLeft'
}

interface Props {
  title?: string
  footnote?: string
  show?: boolean
  onClose: () => void
}

const handleMaskClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cb: () => void): void => {
  if (e.target === e.currentTarget) {
    cb()
  }
}

const Draweer: SFC<Props> = props => {
  const { show = true, children, title = '', footnote = '', onClose = () => {} } = props
  return (
    <CSSTransition in={show} timeout={1000} classNames={classNames} unmountOnExit={true}>
      <div className="drawer-container" onClick={e => handleMaskClick(e, onClose)}>
        <div className="drawer-content">
          {title ? <div className="drawer-header">{title}</div> : null}
          <div className="drawer-body">{children}</div>
          {footnote ? <div className="drawer-footer">{footnote}</div> : null}
        </div>
      </div>
    </CSSTransition>
  )
}

export default Draweer
