import { useSelector } from 'react-redux'

import { AppState } from '../../types/states/AppState'

export const useShouldChainParts = () => {
  return useSelector((state: AppState) => state.settings.shouldChainParts)
}
