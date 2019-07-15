import { fromJS } from 'immutable'
import { CSSTransition } from 'react-transition-group'
import { TOGGLE_PAGE_BTN } from './actionTypes'

interface Action {
  readonly type: string
}

interface State {
  readonly showBtn: boolean
  readonly classNames: CSSTransition.CSSTransitionClassNames
}

const originState: State = {
  showBtn: true,
  classNames: {
    enter: 'animated',
    enterActive: 'slideInDown',
    exit: 'animated',
    exitActive: 'slideOutUp'
  }
}

const defaultState = fromJS(originState)

const reducer = (state = defaultState, action: Action): {} => {
  switch (action.type) {
    case TOGGLE_PAGE_BTN:
      return state.set('showBtn', !state.get('showBtn'))
    default:
      return state
  }
}

export default reducer
