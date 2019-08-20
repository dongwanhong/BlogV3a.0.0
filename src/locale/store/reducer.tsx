import { fromJS } from 'immutable'
import { State, CHANGE_LANG, Action } from './types'

const originState: State = {
  lang: 'zh-CN'
}

const defaultState = fromJS(originState)

const reducer = (state = defaultState, action: Action): State => {
  switch (action.type) {
    case CHANGE_LANG:
      return state.set('lang', action.lang)
    default:
      return state
  }
}

export default reducer
