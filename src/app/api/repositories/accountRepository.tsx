import IUser from '../../../models/users/IUser'
import IUserForm from '../../../models/users/IUserForm'
import apiRequests from '../agent'

const accountRepository = {
  current: (): Promise<IUser> => apiRequests.get('/account'),
  login: (user: IUserForm): Promise<IUser> =>
    apiRequests.post('/account/login', user),
  register: (user: IUserForm): Promise<IUser> =>
    apiRequests.post('/account/register', user),
}

export default accountRepository
