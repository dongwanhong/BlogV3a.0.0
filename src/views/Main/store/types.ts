export const CHANGE_ACTIVE_INDEX = 'CHANGE_ACTIVE_INDEX'

export interface Action {
  type: typeof CHANGE_ACTIVE_INDEX
  index: number
}

export interface State {
  activeIndex: number
}
