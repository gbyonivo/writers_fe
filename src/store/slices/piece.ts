import { createSlice } from '@reduxjs/toolkit'

import { PieceState } from '../../types/states/PieceState'

const initialState: PieceState = {
  likes: {},
}

export const pieceSlice = createSlice({
  name: 'piece',
  initialState,
  reducers: {},
})

export const {} = pieceSlice.actions

export default pieceSlice.reducer
