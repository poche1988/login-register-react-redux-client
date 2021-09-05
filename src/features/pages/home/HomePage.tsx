import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../stores'
import useAccountDispatcher from '../../../stores/account/useAccountDispatcher'

const HomePage = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.loggedInUser)
  const { Logout } = useAccountDispatcher()
  return (
    <>
      <div>Hello {user?.displayName}</div>
      <button onClick={() => Logout()}>Logout</button>
    </>
  )
}

export default HomePage
