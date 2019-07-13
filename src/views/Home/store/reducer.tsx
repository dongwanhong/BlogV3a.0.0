import { fromJS } from 'immutable'
import { TOGGLE_PAGE_BTN } from './actionTypes'

interface Action {
  type: string
}

// 默认数据
const defaultState = fromJS({
  showBtn: true
})

const reducer = (state = defaultState, action: Action): {} => {
  switch (action.type) {
    case TOGGLE_PAGE_BTN:
      return state.set('showBtn', !state.get('showBtn'))
    default:
      return state
  }
}

export default reducer
