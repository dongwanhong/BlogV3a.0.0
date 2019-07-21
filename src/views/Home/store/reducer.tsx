import { fromJS } from 'immutable'
import { State, TOGGLE_PAGE_BTN, Action } from './types'

const originState: State = {
  showBtn: false,
  timeout: 1000,
  classNames: {
    enter: 'animated',
    enterActive: 'slideInDown',
    exit: 'animated',
    exitActive: 'slideOutUp'
  }
}

const defaultState = fromJS(originState)

const reducer = (state = defaultState, action: Action): State => {
  switch (action.type) {
    case TOGGLE_PAGE_BTN:
      return state.set('showBtn', !state.get('showBtn'))
    default:
      return state
  }
}

export default reducer
