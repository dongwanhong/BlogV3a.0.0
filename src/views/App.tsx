import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import store from '../store'
import Home from './Home'
import Main from './Main'

@hot
class App extends Component {
  public render(): React.ReactNode {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/main/" exact component={Main} />
        </Router>
      </Provider>
    )
  }
}

export default App
