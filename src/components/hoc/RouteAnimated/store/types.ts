import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition'

export interface State {
  timeout: number
  unmountOnExit: boolean
  classNames: CSSTransitionClassNames
}
