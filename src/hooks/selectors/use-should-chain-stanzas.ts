import { useSelector } from 'react-redux'

import { AppState } from '../../types/states/AppState'

export const useShouldChainStanzas = () => {
  return useSelector((state: AppState) => state.settings.shouldChainStanzas)
}
