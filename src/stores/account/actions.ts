import { SET_LOGGED_IN_USER, AccountActionTypes } from './types'
import IUser from '../../models/users/IUser'

export function setLoggedInUser(user: IUser): AccountActionTypes {
  return {
    type: SET_LOGGED_IN_USER,
    payload: user,
  }
}
