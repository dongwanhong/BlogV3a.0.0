import { combineReducers } from 'redux-immutable'
import { reducer as RouteAnimatedReducer } from '../components/hoc/RouteAnimated/store'
import { reducer as HomeReducer } from '../views/Home/store'
import { reducer as ResumeReducer } from '../views/Resume/store'
import { reducer as LocalReducer } from '../locale/store'

const reducers = combineReducers({
  routeAnimater: RouteAnimatedReducer,
  home: HomeReducer,
  resume: ResumeReducer,
  local: LocalReducer
})

export default reducers
