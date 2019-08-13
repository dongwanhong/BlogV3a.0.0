import { CHANGE_ACTIVE_INDEX, Action } from './types'

export const getSetActiveIndex = (index: number): Action => ({
  type: CHANGE_ACTIVE_INDEX,
  index
})
