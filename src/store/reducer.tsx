import { combineReducers } from 'redux-immutable'
import { reducer as HomeReducer } from '../views/Home/store'

const reducers = combineReducers({
  home: HomeReducer
})

export default reducers
