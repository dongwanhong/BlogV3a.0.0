import { combineReducers } from 'redux-immutable'
import { reducer as RouteAnimatedReducer } from '../components/hoc/RouteAnimated/store'
import { reducer as HomeReducer } from '../views/Home/store'
import { reducer as MainReducer } from '../views/Main/store'

const reducers = combineReducers({
  routeAnimater: RouteAnimatedReducer,
  home: HomeReducer,
  main: MainReducer
})

export default reducers
