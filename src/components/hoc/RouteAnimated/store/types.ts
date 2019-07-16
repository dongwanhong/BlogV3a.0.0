import { CSSTransition } from 'react-transition-group'

export interface State {
  timeout: number
  unmountOnExit: boolean
  classNames: CSSTransition.CSSTransitionClassNames
}
