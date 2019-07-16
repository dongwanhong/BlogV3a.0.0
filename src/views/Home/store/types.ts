import { CSSTransition } from 'react-transition-group'

export const TOGGLE_PAGE_BTN = 'TOGGLE_PAGE_BTN'

export interface Action {
  type: typeof TOGGLE_PAGE_BTN
}

export interface State {
  showBtn: boolean
  timeout: number
  classNames: CSSTransition.CSSTransitionClassNames
}
