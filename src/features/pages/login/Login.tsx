import React from 'react'
import { Divider, Grid, Segment } from 'semantic-ui-react'
import LoginForm from '../../components/account/LoginForm'
import RegisterForm from '../../components/account/RegisterForm'

const Login = (): JSX.Element => {
  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <LoginForm />
        </Grid.Column>

        <Grid.Column verticalAlign="middle">
          <RegisterForm />
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>
  )
}

export default Login
