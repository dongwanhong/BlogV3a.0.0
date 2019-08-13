import { fromJS } from 'immutable'
import { State, CHANGE_ACTIVE_INDEX, Action } from './types'

const originState: State = {
  activeIndex: 0,
  navList: [
    {
      id: 1,
      url: 'https://github.com/dongwanhong',
      text: 'Github'
    },
    {
      id: 2,
      url: '/',
      text: '项目演示'
    },
    {
      id: 3,
      url: '/',
      text: '博文'
    },
    {
      id: 4,
      url: 'https://dongwanhong.github.io/notebook/',
      text: '笔记'
    },
    {
      id: 5,
      url: '/',
      text: '关于我'
    },
    {
      id: 6,
      url: '/',
      text: '设置'
    }
  ]
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
