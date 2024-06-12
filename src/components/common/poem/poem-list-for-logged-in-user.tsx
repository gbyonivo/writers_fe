import { useSelector } from 'react-redux'

import { AppState } from '../../../types/states/AppState'
import { PoemListContainer } from './poem-list-container'

export function PoemListForLoggedInUser() {
  const user = useSelector(({ login }: AppState) => login.user)

  if (!user) return null

  return <PoemListContainer userId={user.id} />
}
