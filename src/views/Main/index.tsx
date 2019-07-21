import React, { PureComponent } from 'react'
import { PageScroll } from '../../components'
import { withAnimateRoute } from '../../components'

class Main extends PureComponent {
  public render(): React.ReactNode {
    return (
      <PageScroll>
        <PageScroll.PageItem>1</PageScroll.PageItem>
        <PageScroll.PageItem>2</PageScroll.PageItem>
      </PageScroll>
    )
  }
}

export default withAnimateRoute(Main)
