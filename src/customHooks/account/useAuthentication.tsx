import { useSelector } from 'react-redux'
import { RootState } from '../../stores/index'

interface IReturn {
  isAuthenticated: () => boolean
}

const useAuthentication = (): IReturn => {
  const user = useSelector((state: RootState) => state.loggedInUser)
  const isAuthenticated = (): boolean => {
    return user?.token ? true : false
  }

  return { isAuthenticated }
}

export default useAuthentication
