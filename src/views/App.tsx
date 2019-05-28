import React, { Component } from 'react'
import { hot } from 'react-hot-loader/root'

export interface HelloProps {
  compiler: string
  framework: string
}

@hot
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class App extends Component<HelloProps, {}> {
  public static defaultProps = {
    compiler: 'TypeScript',
    framework: 'React'
  }

  public render(): React.ReactNode {
    return (
      <h1>
        Hello from {this.props.compiler} and {this.props.framework}!
      </h1>
    )
  }
}

export default App
