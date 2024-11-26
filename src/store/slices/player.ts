import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Sound } from 'expo-av/build/Audio'

import { PlayerState, PlayingStatus } from '../../types/states/PlayerState'

const initialState: PlayerState = {
  partIds: null,
  pieceId: null,
  title: null,
  status: PlayingStatus.STOP,
  currentSound: null,
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
    setCurrentSound: (state, { payload }: PayloadAction<Sound | null>) => {
      return {
        ...state,
        currentSound: payload,
      }
    },
  },
})

export const {
  startPlayer,
  stopPlayer,
  playPlayer,
  pausePlayer,
  setCurrentSound,
} = playerSlice.actions

export default playerSlice.reducer
