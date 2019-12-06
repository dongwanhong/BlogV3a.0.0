import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition'

export const TOGGLE_PAGE_BTN = 'TOGGLE_PAGE_BTN'

export const CHANGE_RAIN_ANIMATION = 'CHANGE_RAIN_ANIMATION'

export interface BtnAction {
  type: typeof TOGGLE_PAGE_BTN
}

export interface ChangeRainAction {
  type: typeof CHANGE_RAIN_ANIMATION
}

export type Action = BtnAction | ChangeRainAction

export interface State {
  running: boolean
  showBtn: boolean
  timeout: number
  classNames: CSSTransitionClassNames
}
