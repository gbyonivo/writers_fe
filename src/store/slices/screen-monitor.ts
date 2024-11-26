import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ScreenMonitorState } from '../../types/states/screen-monitor-state'
import { TrackedScreen } from '../../utils/tracking/tracked-screen'

const initialState: ScreenMonitorState = {
  currentScreen: null,
}

export const screenMonitorSlice = createSlice({
  name: 'screen-monitor',
  initialState,
  reducers: {
    setCurrentScreen: (state, { payload }: PayloadAction<TrackedScreen>) => {
      return {
        ...state,
        currentScreen: payload,
      }
    },
  },
})

export const { setCurrentScreen } = screenMonitorSlice.actions

export default screenMonitorSlice.reducer
