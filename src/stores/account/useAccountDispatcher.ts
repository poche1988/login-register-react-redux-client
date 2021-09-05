import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import IUser from '../../models/users/IUser'
import { SET_LOGGED_IN_USER } from './types'

interface IActions {
  Login: (user: IUser) => void
  Logout: () => void
}

const useAccountDispatcher = (): IActions => {
  const dispatch = useDispatch()
  const history = useHistory()

  const actions = useMemo(
    () => ({
      Login(user: IUser) {
        dispatch({ type: SET_LOGGED_IN_USER, payload: user })
        if (user.token) window.localStorage.setItem('jwt', user.token)
        if (user.displayName)
          window.localStorage.setItem('loggedInUser', user.displayName)
        history.push(`/Home`)
      },
      Logout() {
        dispatch({ type: SET_LOGGED_IN_USER, payload: null })
        window.localStorage.removeItem('jwt')
        window.localStorage.removeItem('loggedInUser')
        history.push(`/`)
      },
    }),
    [dispatch],
  )
  return actions
}

export default useAccountDispatcher
