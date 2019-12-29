export interface Tag {
  id: number
  text: string
}

export interface Type {
  id: number
  intlId: string
  text: string
  tags: number[]
}

export interface State {
  isMobileTerminal: boolean
  tags: Tag[]
  types: Type[]
}
