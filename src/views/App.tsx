import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import store from '../store'
import Home from './Home'

@hot
class App extends PureComponent {
  public render(): React.ReactNode {
    return (
      <Provider store={store}>
        <Router>
          {/* Do not use `Switch` component to avoid failing to implement exit animation */}
          <Route path="/" exact children={props => <Home {...props} />} />
        </Router>
      </Provider>
    )
  }
}

export default App
