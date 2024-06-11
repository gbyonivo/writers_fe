import { useSelector } from 'react-redux'

import { AppState } from '../../../types/states/AppState'
import { PoemListContainer } from './poem-list-container'

export const PoemListForLoggedInUser = () => {
  const user = useSelector(({ login }: AppState) => login.user)

  return <PoemListContainer userId={user.id} />
}
