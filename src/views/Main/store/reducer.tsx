import { fromJS } from 'immutable'
import { State, CHANGE_ACTIVE_INDEX, Action } from './types'

const originState: State = {
  activeIndex: 0
}

const defaultState = fromJS(originState)

const reducer = (state = defaultState, action: Action): State => {
  switch (action.type) {
    case CHANGE_ACTIVE_INDEX:
      return state.set('activeIndex', action.index)
    default:
      return state
  }
}

export default reducer
