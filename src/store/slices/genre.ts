import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { GenreState } from '../../types/states/GenreState'

const initialState: GenreState = {
  genreIdToGenre: {},
}

export const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenreIdToGenre: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        genreIdToGenre: payload,
      }
    },
  },
})

export const { setGenreIdToGenre } = genreSlice.actions

export default genreSlice.reducer
