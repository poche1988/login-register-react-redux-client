import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, RouteComponentProps } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import useAuthentication from '../../customHooks/account/useAuthentication'
import useAccountDispatcher from '../../stores/account/useAccountDispatcher'
import { RootState } from '../../stores/index'

export const NavBar = (props: RouteComponentProps): JSX.Element => {
  const user = useSelector((state: RootState) => state.account.loggedInUser)
  const { Logout } = useAccountDispatcher(props)
  const { isAuthenticated } = useAuthentication()

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={NavLink} to="/">
          <img src="/assets/logo.png" alt="My Pet Calendar" />
          My Pet Calendar
        </Menu.Item>
        <Menu.Item as={NavLink} to="/Pets" name="Pets" />
        <Menu.Item name="Calendar" />
        <Menu.Item name="Grooming" />
        <Menu.Item name="Vet" />
        <Menu.Item name="Calendar" />
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
