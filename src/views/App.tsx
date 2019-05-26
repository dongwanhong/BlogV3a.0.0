import React, { Component } from 'react'

export interface HelloProps {
  compiler: string
  framework: string
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class App extends Component<HelloProps, {}> {
  public render(): React.ReactNode {
    return (
      <h1>
        Hello from {this.props.compiler} and {this.props.framework}!
      </h1>
    )
  }
}

export default App
