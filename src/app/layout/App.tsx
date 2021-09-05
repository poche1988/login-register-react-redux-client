import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { NavBar } from '../../features/nav/NavBar'
import { Container } from 'semantic-ui-react'
import { Route, RouteComponentProps, withRouter } from 'react-router-dom'
import HomePage from '../../features/pages/home/HomePage'
import PrivateRoute from './PrivateRoute'
import Login from '../../features/pages/login/Login'

const App = (props: RouteComponentProps): JSX.Element => {
  return (
    <>
      <Route exact path="/" component={Login} />

      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar {...props} />
            <Container>
              <PrivateRoute path="/Home" component={HomePage} />
            </Container>
          </>
        )}
      />
    </>
  )
}

export default withRouter(App)
