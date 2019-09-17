export interface Tag {
  id: number
  text: string
}

export interface State {
  isMobileTerminal: boolean
  tags: Tag[]
}
