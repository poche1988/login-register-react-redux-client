import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, RouteComponentProps } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import useAuthentication from '../../customHooks/account/useAuthentication'
import useAccountDispatcher from '../../stores/account/useAccountDispatcher'
import { RootState } from '../../stores/index'

export const NavBar = (props: RouteComponentProps): JSX.Element => {
  const user = useSelector((state: RootState) => state.loggedInUser)
  const { Logout } = useAccountDispatcher(props)
  const { isAuthenticated } = useAuthentication()

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={NavLink} to="/Home" name="Home" />
      </Container>
      {isAuthenticated() && (
        <div>
          Hello {user?.displayName}{' '}
          <button onClick={() => Logout()}>Logout</button>
        </div>
      )}
    </Menu>
  )
}
