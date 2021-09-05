import React from 'react'
import './style.css'
import 'semantic-ui-css/semantic.min.css'
import { NavBar } from '../../features/nav/NavBar'
import { Container } from 'semantic-ui-react'
import { PetDashboard } from '../../features/pages/pet/dashboard/PetDashboard'
import { Route, RouteComponentProps, withRouter } from 'react-router-dom'
import HomePage from '../../features/pages/home/HomePage'
import Details from '../../features/pages/pet/details/Details'
import Upsert from '../../features/pages/pet/upsert/Upsert'
import PrivateRoute from './PrivateRoute'

const App = (props: RouteComponentProps): JSX.Element => {
  return (
    <>
      <Route exact path="/" component={HomePage} />

      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar {...props} />
            <Container style={{ marginTop: '7em' }}>
              <PrivateRoute path="/Pets" component={PetDashboard} />
              <PrivateRoute path="/Pets/:id" component={Details} />
              <PrivateRoute
                key={props.location.key}
                path={['/Pet/Create', '/Pet/Edit/:id']}
                component={Upsert}
              />
            </Container>
          </>
        )}
      />
    </>
  )
}

export default withRouter(App)
