import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { PoemState } from '../../types/states/PoemState'

const initialState: PoemState = {
  likes: {},
}

export const poemSlice = createSlice({
  name: 'poem',
  initialState,
  reducers: {
    setLikes: (state, { payload }: PayloadAction<any | null>) => ({
      ...payload,
      ...state,
    }),
    toggleLike: (
      state,
      { payload }: PayloadAction<{ poemId: number } | null>,
    ) => {
      return {
        ...state,
        likes: {
          ...state.likes,
          [payload.poemId]: !state.likes[payload.poemId],
        },
      }
    },
  },
})

export const { toggleLike, setLikes } = poemSlice.actions

export default poemSlice.reducer
