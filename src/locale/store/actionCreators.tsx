import { CHANGE_LANG, Action, Lang } from './types'

export const getToggleBtn = (lang: Lang): Action => ({
  lang,
  type: CHANGE_LANG
})
