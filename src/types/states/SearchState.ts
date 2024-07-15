import { SearchValueStatus } from '../search-value-status'

export interface SearchState {
  searchValue: string
  genreValue: string
  searchValueStatus: SearchValueStatus
}
