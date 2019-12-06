import { TOGGLE_PAGE_BTN, CHANGE_RAIN_ANIMATION, BtnAction, ChangeRainAction } from './types'

export const getToggleBtn = (): BtnAction => ({
  type: TOGGLE_PAGE_BTN
})

export const getToggleRainAnimation = (): ChangeRainAction => ({
  type: CHANGE_RAIN_ANIMATION
})
