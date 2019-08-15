import React from 'react'
import { Switch, Route, RouteComponentProps, SwitchProps, match } from 'react-router'
import { Location } from 'history'

export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}>
  extends RouteComponentProps<Params> {
  route?: RouteConfig
}

interface RouteConfig {
  key?: React.Key
  location?: Location
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType
  path?: string
  exact?: boolean
  strict?: boolean
  routes?: RouteConfig[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (props: RouteConfigComponentProps<any>) => React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any
}

export interface MatchedRoute<Params extends { [K in keyof Params]?: string }> {
  route: RouteConfig
  match: match<Params>
}

/*
export function matchRoutes<Params extends { [K in keyof Params]?: string }>(
  routes: RouteConfig[],
  pathname: string
): Array<MatchedRoute<Params>>
*/

interface RenderRoutes {
  (
    routes: RouteConfig[] | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extraProps?: any,
    switchProps?: SwitchProps
  ): JSX.Element | null
}

const renderRoutes: RenderRoutes = (routes, extraProps = {}, switchProps = {}) => {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props =>
            route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : route.component ? (
              <route.component {...props} {...extraProps} route={route} />
            ) : null
          }
        />
      ))}
    </Switch>
  ) : null
}

export default renderRoutes
