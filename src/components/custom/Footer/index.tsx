import React, { Component } from 'react'

class Footer extends Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <div className="footer">
        {`Copyright © 2019-${new Date().getFullYear()} 码良 anani1994.github.io all right reserved`}
      </div>
    )
  }
}

export default Footer
