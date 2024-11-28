import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { AudioState } from '../../types/states/AudioState'

const initialState: AudioState = {
  idToElevenVoice: {},
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
  },
})

export const { setIdToElevenVoice } = audioSlice.actions

export default audioSlice.reducer
