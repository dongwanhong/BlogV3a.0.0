import React, { PureComponent, ComponentType, ReactNode } from 'react'
import { RouteComponentProps, match } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import utils from '../../../utils'

type AnimateRouteComponentProps = Omit<RouteComponentProps, 'match' | 'staticContext'> & {
  match: match<{}> | null
}

const classNames = {
  enter: 'animated',
  enterActive: 'slideInDown',
  exit: 'animated',
  exitActive: 'slideOutUp'
}

function withAnimateRoute<T>(
  WrappedComponent: ComponentType<T>
): ComponentType<T & AnimateRouteComponentProps> {
  return class WithAnimateRoute extends PureComponent<T & AnimateRouteComponentProps, {}> {
    public displayName = utils.setHocComponentName(WithAnimateRoute, WrappedComponent)

    public render(): ReactNode {
      const { match } = this.props

      return (
        <CSSTransition
          in={match !== null}
          timeout={1000}
          classNames={classNames}
          unmountOnExit={true}
        >
          <WrappedComponent {...this.props} />
        </CSSTransition>
      )
    }
  }
}

export default withAnimateRoute
