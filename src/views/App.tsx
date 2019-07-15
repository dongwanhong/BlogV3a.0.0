import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import store from '../store'
import Home from './Home'
import Main from './Main'

@hot
class App extends PureComponent {
  public render(): React.ReactNode {
    return (
      <Provider store={store}>
        <Router>
          {/* Do not use `Switch` component to avoid failing to implement exit animation */}
          <Route path="/" exact children={props => <Home {...props} />} />
          <Route path="/main" children={props => <Main {...props} />} />
        </Router>
      </Provider>
    )
  }
}

export default App
