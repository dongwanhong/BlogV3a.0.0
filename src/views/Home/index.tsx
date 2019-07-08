import React, { Component } from 'react'
import { TopBar, Footer } from '../../components'

class Home extends Component {
  public render(): React.ReactNode {
    return (
      <div className="home">
        <TopBar />
        <div className="text">
          If you can't explain it simply,
          <br />
          you don't understand it well enough.
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
