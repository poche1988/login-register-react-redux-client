import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import { Route, withRouter } from 'react-router-dom'
import HomePage from '../../features/pages/home/HomePage'
import PrivateRoute from './PrivateRoute'
import LoginRegister from '../../features/pages/loginRegister/LoginRegister'

const App = (): JSX.Element => {
  return (
    <>
      <Route exact path="/" component={LoginRegister} />

      <Route
        path={'/(.+)'}
        render={() => (
          <Container>
            <PrivateRoute path="/Home" component={HomePage} />
          </Container>
        )}
      />
    </>
  )
}

export default withRouter(App)
