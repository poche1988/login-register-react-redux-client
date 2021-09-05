import AccountState from './state'
import { SET_LOGGED_IN_USER, AccountActionTypes } from './types'

const initialState: AccountState = {
  loggedInUser: {
    token: window.localStorage.getItem('jwt'),
    displayName: window.localStorage.getItem('loggedInUser'),
    username: null,
  },
}

const accountReducer = (
  state = initialState,
  action: AccountActionTypes,
): AccountState => {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      }
    default:
      return state
  }
}

export default accountReducer
