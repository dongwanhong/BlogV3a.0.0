import { Record } from 'immutable'
import { combineReducers } from 'redux-immutable'
import {
  reducer as RouteAnimatedReducer,
  State as RouteAnimatedState
} from '../components/hoc/RouteAnimated/store'
import { reducer as HomeReducer, State as HomeSate } from '../views/Home/store'
import { reducer as ResumeReducer, State as ResumeState } from '../views/Resume/store'
import { reducer as LocalReducer, State as LocalState } from '../locale/store'
import { reducer as ConfigReducer, State as ConfigState } from '../views/Config/store'

const reducers = combineReducers({
  routeAnimater: RouteAnimatedReducer,
  home: HomeReducer,
  resume: ResumeReducer,
  local: LocalReducer,
  config: ConfigReducer
})

export interface RootState {
  routeAnimater: RouteAnimatedState
  home: HomeSate
  resume: ResumeState
  local: LocalState
  config: ConfigState
}

export type AppState = Record<RootState>

export default reducers
