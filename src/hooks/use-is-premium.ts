import { useSelector } from 'react-redux'

import { AppState } from '../types/states/AppState'

export const useIsPremium = () => {
  const { user } = useSelector((state: AppState) => state.login)
  return user.accountType === 'PREMIUM'
}
