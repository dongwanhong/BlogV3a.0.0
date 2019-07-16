import React, { PureComponent, ComponentType, ReactNode } from 'react'
import { RouteComponentProps, match } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { AppState } from '../../../store'
import { State as StateToProps } from './store'
import utils from '../../../utils'

type AnimateRouteComponentProps = Omit<RouteComponentProps, 'match' | 'staticContext'> & {
  match: match<{}> | null
}

const mapStateToProps = (state: AppState): StateToProps => ({
  unmountOnExit: state.getIn(['routeAnimater', 'showBtn']),
  timeout: state.getIn(['routeAnimater', 'timeout']),
  classNames: state.getIn(['routeAnimater', 'classNames']).toJS()
})

function withAnimateRoute<T>(
  WrappedComponent: ComponentType<T>
): ComponentType<T & AnimateRouteComponentProps> {
  class WithAnimateRoute extends PureComponent<T & AnimateRouteComponentProps & StateToProps, {}> {
    public displayName = utils.setHocComponentName(WithAnimateRoute, WrappedComponent)

    public render(): ReactNode {
      const { match, classNames, timeout, unmountOnExit } = this.props

      return (
        <CSSTransition
          in={match !== null}
          timeout={timeout}
          classNames={classNames}
          unmountOnExit={unmountOnExit}
        >
          <WrappedComponent {...this.props} />
        </CSSTransition>
      )
    }
  }

  const enhance = connect(mapStateToProps)
  // @ts-ignore
  return enhance(WithAnimateRoute)
}

export default withAnimateRoute
