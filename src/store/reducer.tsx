import { combineReducers } from 'redux-immutable'
import { reducer as RouteAnimatedReducer } from '../components/hoc/RouteAnimated/store'
import { reducer as HomeReducer } from '../views/Home/store'
import { reducer as ResumeReducer } from '../views/Resume/store'
import { reducer as LocalReducer } from '../locale/store'
import { reducer as ConfigReducer } from '../views/Config/store'

const reducers = combineReducers({
  routeAnimater: RouteAnimatedReducer,
  home: HomeReducer,
  resume: ResumeReducer,
  local: LocalReducer,
  config: ConfigReducer
})

export default reducers
