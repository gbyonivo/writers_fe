import { useSelector } from 'react-redux'

import { SearchValueStatus } from '../../../types/search-value-status'
import { AppState } from '../../../types/states/AppState'
import { DoneSearchValueState } from './done-search-value-state'
import { InitialSearchState } from './initial-search-state'
import { TypingSearchValueState } from './typing-search-value-state'

export function Results() {
  const { searchValueStatus } = useSelector((state: AppState) => state.search)

  if (searchValueStatus === SearchValueStatus.EMPTY) {
    return <InitialSearchState />
  }

  if (searchValueStatus === SearchValueStatus.TYPING) {
    return <TypingSearchValueState />
  }

  return <DoneSearchValueState />
}
