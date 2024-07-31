import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import {
  ExpoVoice,
  PlayerState,
  PlayingStatus,
} from '../../types/states/PlayerState'

const initialState: PlayerState = {
  partIds: null,
  pieceId: null,
  title: null,
  status: PlayingStatus.PLAYING,
  voices: [],
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    startPlayer: (
      state,
      {
        payload,
      }: PayloadAction<{
        pieceId?: number
        title?: string
        partIds?: number[]
      }>,
    ) => {
      return {
        ...state,
        pieceId: payload.pieceId,
        title: payload.title,
        partIds: payload.partIds,
        status: PlayingStatus.PLAYING,
      }
    },
    stopPlayer: (state) => {
      return {
        ...state,
        pieceId: null,
        partIds: null,
        title: null,
        status: PlayingStatus.STOP,
      }
    },
    pausePlayer: (state) => {
      return {
        ...state,
        status: PlayingStatus.PAUSED,
      }
    },
    playPlayer: (state) => {
      return {
        ...state,
        status: PlayingStatus.PLAYING,
      }
    },
    setVoices: (state, { payload }: PayloadAction<ExpoVoice[]>) => {
      return {
        ...state,
        voices: payload,
      }
    },
  },
})

export const { startPlayer, stopPlayer, playPlayer, pausePlayer, setVoices } =
  playerSlice.actions

export default playerSlice.reducer
