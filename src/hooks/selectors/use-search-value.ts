import { useSelector } from 'react-redux'

import { AppState } from '../../types/states/AppState'

export const useSearchValue = (): string => {
  return useSelector((state: AppState) => state.search.searchValue)
}
