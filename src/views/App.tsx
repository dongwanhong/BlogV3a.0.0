import React, { PureComponent } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import store from '../store'
import renderRoutes, { routes } from '../router'
import LocaleProvider from '../locale'

@hot
class App extends PureComponent {
  public render(): React.ReactNode {
    return (
      <Provider store={store}>
        <LocaleProvider>
          <Router>
            {/* Do not use `Switch` component to avoid failing to implement exit animation */}
            {renderRoutes(routes)}
          </Router>
        </LocaleProvider>
      </Provider>
    )
  }
}

export default App
