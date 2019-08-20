export const CHANGE_LANG = 'CHANGE_LANG'

export type Lang = 'zh-CN' | 'en-US'

export interface Action {
  lang: Lang
  type: typeof CHANGE_LANG
}

export interface State {
  lang: string
}
