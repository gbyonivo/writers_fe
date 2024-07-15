import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { SearchValueStatus } from '../../types/search-value-status'
import { SearchState } from '../../types/states/SearchState'

const initialState: SearchState = {
  searchValue: '',
  searchValueStatus: SearchValueStatus.EMPTY,
  genreValue: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, { payload }: PayloadAction<string | null>) => {
      let searchValueStatus =
        payload.length > 0 ? SearchValueStatus.TYPING : SearchValueStatus.EMPTY
      if (state.genreValue) {
        searchValueStatus = state.searchValueStatus
      }
      return {
        ...state,
        searchValue: payload,
        searchValueStatus,
      }
    },
    onDoneTyping: (state) => ({
      ...state,
      searchValueStatus: SearchValueStatus.DONE,
    }),
    setGenreValue: (state, { payload }: PayloadAction<string | null>) => {
      return {
        ...state,
        genreValue: payload,
        searchValueStatus:
          payload.length > 0 ? SearchValueStatus.DONE : state.searchValueStatus,
      }
    },
  },
})

export const { setSearchValue, onDoneTyping, setGenreValue } =
  searchSlice.actions

export default searchSlice.reducer
