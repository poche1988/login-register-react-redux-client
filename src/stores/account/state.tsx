import IUser from '../../models/users/IUser'

export default interface AccountState {
  loggedInUser: IUser | null
}
