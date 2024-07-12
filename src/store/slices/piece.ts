import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { PieceState } from '../../types/states/PieceState'

const initialState: PieceState = {
  likes: {},
}

export const pieceSlice = createSlice({
  name: 'piece',
  initialState,
  reducers: {
    setLikes: (state, { payload }: PayloadAction<any | null>) => ({
      ...state,
      likes: {
        ...state.likes,
        ...payload,
      },
    }),
    toggleLike: (
      state,
      { payload }: PayloadAction<{ pieceId: number } | null>,
    ) => {
      return {
        ...state,
        likes: {
          ...state.likes,
          [payload.pieceId]: !state.likes[payload.pieceId],
        },
      }
    },
  },
})

export const { toggleLike, setLikes } = pieceSlice.actions

export default pieceSlice.reducer
