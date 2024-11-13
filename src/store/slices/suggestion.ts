import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { SuggestionState } from '../../types/states/SuggestionState'

const initialState: SuggestionState = {
  suggestionMap: {},
}

export const pieceSlice = createSlice({
  name: 'piece',
  initialState,
  reducers: {
    addSuggestion: (
      state,
      { payload }: PayloadAction<{ key: string; value: string[] }>,
    ) => ({
      ...state,
      suggestionMap: {
        ...state.suggestionMap,
        [payload.key]: payload.value,
      },
    }),
  },
})

export const { addSuggestion } = pieceSlice.actions

export default pieceSlice.reducer
