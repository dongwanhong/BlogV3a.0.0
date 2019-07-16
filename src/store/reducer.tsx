import { combineReducers } from 'redux-immutable'
import { reducer as HomeReducer } from '../views/Home/store'
import { reducer as RouteAnimatedReducer } from '../components/hoc/RouteAnimated/store'

const reducers = combineReducers({
  home: HomeReducer,
  routeAnimater: RouteAnimatedReducer
})

export default reducers
