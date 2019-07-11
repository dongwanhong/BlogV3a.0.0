import { fromJS } from 'immutable'
import { INIT_NAV_LIST } from './actionTypes'
import { NavList } from '../../../components/custom/TopBar'

interface Action {
  type: string
  navList: NavList
}

// 默认数据
const defaultState = fromJS({
  navList: []
})

const reducer = (state = defaultState, action: Action): {} => {
  switch (action.type) {
    case INIT_NAV_LIST:
      return state.set('navList', action.navList)
    default:
      return state
  }
}

export default reducer
