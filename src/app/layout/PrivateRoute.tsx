/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { RootState } from '../../stores/index'

const PrivateRoute = ({ component, ...rest }: any): JSX.Element => {
  const user = useSelector((state: RootState) => state.account.loggedInUser)

  const routeComponent = (props: any) =>
    user?.token ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/' }} />
    )
  return <Route exact {...rest} render={routeComponent} />
}

export default PrivateRoute
