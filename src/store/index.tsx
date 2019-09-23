import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers, { AppState } from './reducer'

interface WindowReduxTool {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
}

const composeEnhancers =
  (window && (window as WindowReduxTool).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export type AppState = AppState

export default store
