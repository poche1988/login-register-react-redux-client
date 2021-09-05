import { useSelector } from 'react-redux'
import { RootState } from '../../stores/index'

const useAuthentication = (): boolean => {
  const user = useSelector((state: RootState) => state.loggedInUser)
  return user?.token !== null && user?.token !== undefined
}

export default useAuthentication
