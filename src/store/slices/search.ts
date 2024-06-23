import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { SearchValueStatus } from '../../types/search-value-status'
import { SearchState } from '../../types/states/SearchState'

const initialState: SearchState = {
  searchValue: '',
  searchValueStatus: SearchValueStatus.EMPTY,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, { payload }: PayloadAction<string | null>) => {
      return {
        ...state,
        searchValue: payload,
        searchValueStatus:
          payload.length > 0
            ? SearchValueStatus.TYPING
            : SearchValueStatus.EMPTY,
      }
    },
    onDoneTyping: (state) => ({
      ...state,
      searchValueStatus: SearchValueStatus.DONE,
    }),
  },
})

export const { setSearchValue, onDoneTyping } = searchSlice.actions

export default searchSlice.reducer
