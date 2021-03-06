import { fromJS } from 'immutable'
import { State } from './types'

const originState: State = {
  unmountOnExit: true,
  timeout: 1000,
  classNames: {
    enter: 'animated',
    enterActive: 'fadeIn',
    exit: 'animated',
    exitActive: 'fadeOut'
  }
}

const defaultState = fromJS(originState)

const reducer = (state = defaultState, action: {}): {} => state

export default reducer
