interface Props {
  url: string
  attributes?: {
    [prop: string]: string
  }
  onError?: () => void
  onLoad?: () => void
  onCreate?: () => void
}

declare module 'react-load-script' {
  import { Component } from 'react'
  export default class Scrcip extends Component<Props, {}> {}
}
