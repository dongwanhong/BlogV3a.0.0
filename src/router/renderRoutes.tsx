import React, { Suspense } from 'react'
import { Switch, Route, RouteComponentProps, SwitchProps, match } from 'react-router'
import { Location } from 'history'
import DocumentTitle from 'react-document-title'
import { FormattedMessage } from 'react-intl'

export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}>
  extends RouteComponentProps<Params> {
  route?: RouteConfig
}

export interface RouteConfig {
  key?: React.Key
  path?: string
  exact?: boolean
  meta?: {
    title?: string
  }
  strict?: boolean
  routes?: RouteConfig[]
  location?: Location
  component?:
    | React.ComponentType<RouteConfigComponentProps<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
    | React.ComponentType
    | React.LazyExoticComponent<any> // eslint-disable-line @typescript-eslint/no-explicit-any
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
          render={props => {
            if (route.render) {
              return route.render({ ...props, ...extraProps, route: route })
            } else if (route.component) {
              return (
                <Suspense fallback={<div>Loading...</div>}>
                  {route.meta && route.meta.title ? (
                    <FormattedMessage id={route.meta.title}>
                      {txt => <DocumentTitle title={txt as string} />}
                    </FormattedMessage>
                  ) : null}
                  <route.component {...props} {...extraProps} route={route} />
                </Suspense>
              )
            } else {
              return null
            }
          }}
        />
      ))}
    </Switch>
  ) : null
}

export default renderRoutes
