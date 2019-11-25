/**
 * 由于遮罩层的宽度较大（一个屏幕），所以整体滑动不太友好
 * 所以直接滑动内容板块
 * 进一步将遮罩层从容器上分离出来添加透明度的切换动画
 */
import React, { SFC, RefObject, createRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition'

const classNames: CSSTransitionClassNames = {
  enter: 'animated',
  enterActive: 'slideInRight',
  enterDone: 'open',
  exit: 'animated',
  exitActive: 'slideOutRight'
}

const maskClassNames: CSSTransitionClassNames = {
  enter: 'animated',
  enterActive: 'fadeIn',
  exit: 'animated',
  exitActive: 'fadeOut'
}

interface Props {
  title?: string
  footnote?: string
  show?: boolean
  onClose: () => void
}

const handleMaskClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  maskEle: RefObject<HTMLDivElement>,
  cb: () => void
): void => {
  if (maskEle.current === e.target) {
    cb()
  }
}

const Draweer: SFC<Props> = props => {
  const maskEle: RefObject<HTMLDivElement> = createRef()
  const { show = true, children, title = '', footnote = '', onClose = () => {} } = props
  return (
    <div
      className="drawer-container"
      style={{ width: show ? '100%' : '' }}
      onClick={e => handleMaskClick(e, maskEle, onClose)}
    >
      <CSSTransition in={show} timeout={1000} classNames={maskClassNames} unmountOnExit={false}>
        <div className="drawer-mask" ref={maskEle} />
      </CSSTransition>
      <CSSTransition in={show} timeout={1000} classNames={classNames} unmountOnExit={false}>
        <div className="drawer-content">
          {title ? <div className="drawer-header">{title}</div> : null}
          <div className="drawer-body" style={footnote ? {} : { height: '100%' }}>
            {children}
          </div>
          {footnote ? <div className="drawer-footer">{footnote}</div> : null}
        </div>
      </CSSTransition>
    </div>
  )
}

export default Draweer
