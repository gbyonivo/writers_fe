import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { AudioStatus } from '../../types/audio'
import { AudioState } from '../../types/states/AudioState'

const initialState: AudioState = {
  idToElevenVoice: {},
  status: AudioStatus.EMPTY,
  partIds: [],
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setIdToElevenVoice: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        idToElevenVoice: payload,
      }
    },
    setAudio: (
      state,
      { payload }: PayloadAction<{ pieceId: number; partIds: number[] }>,
    ) => {
      return {
        ...state,
        partIds: payload.partIds,
        pieceId: payload.pieceId,
      }
    },
    playAudio: (state) => {
      return {
        ...state,
        status: AudioStatus.PLAYING,
      }
    },
    loadAudio: (state) => {
      return {
        ...state,
        status: AudioStatus.LOADING,
      }
    },
    stopAudio: (state) => {
      return {
        ...state,
        status: AudioStatus.STOPPED,
      }
    },
    pauseAudio: (state) => {
      return {
        ...state,
        status: AudioStatus.PAUSED,
      }
    },
    resetAudio: (state) => {
      return {
        ...state,
        status: AudioStatus.EMPTY,
        partIds: [],
        pieceId: undefined,
      }
    },
  },
})

export const {
  setIdToElevenVoice,
  stopAudio,
  pauseAudio,
  playAudio,
  resetAudio,
  loadAudio,
  setAudio,
} = audioSlice.actions

export default audioSlice.reducer
