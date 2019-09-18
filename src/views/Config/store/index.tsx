import reducer from './reducer'
import { State, Type, Tag } from './types'

// microsoft/TypeScript/issues/28481
export type State = State
export { reducer, Type, Tag }
