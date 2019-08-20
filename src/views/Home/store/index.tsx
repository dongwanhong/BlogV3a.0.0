import * as actionCreators from './actionCreators'
import reducer from './reducer'
import { State } from './types'

// microsoft/TypeScript/issues/28481
export type State = State
export { actionCreators, reducer }
