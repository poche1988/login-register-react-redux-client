import IUser from '../../models/users/IUser'

export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'

interface SetLoggedInUser {
  type: typeof SET_LOGGED_IN_USER
  payload: IUser
}

export type AccountActionTypes = SetLoggedInUser
