import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import Home from './Home'
import Main from './Main'

@hot
class App extends Component {
  public render(): React.ReactNode {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/main/" exact component={Main} />
      </Router>
    )
  }
}

export default App
