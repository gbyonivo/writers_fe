import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Theme } from '../../types/Theme'
import { SettingsState } from '../../types/states/SettingState'

const initialState: SettingsState = {
  theme: null,
  shouldChainParts: false,
  shouldShowTextBasedDesgin: false,
  shouldUseAiForOnlyTips: true,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, { payload }: PayloadAction<Theme | null>) => {
      return {
        ...state,
        theme: payload,
      }
    },
    toggleShouldChainPart: (state) => {
      return {
        ...state,
        shouldChainParts: !state.shouldChainParts,
      }
    },
    toggleShouldUseAiForOnlyTips: (state) => {
      return {
        ...state,
        shouldUseAiForOnlyTips: !state.shouldUseAiForOnlyTips,
      }
    },
    setShouldChainPart: (state, { payload }: PayloadAction<boolean>) => {
      return {
        ...state,
        shouldChainParts: payload,
      }
    },
    setShouldShowTextBasedDesign: (
      state,
      { payload }: PayloadAction<boolean>,
    ) => {
      return {
        ...state,
        shouldShowTextBasedDesgin: payload,
      }
    },
  },
})

export const {
  setTheme,
  toggleShouldChainPart,
  setShouldChainPart,
  setShouldShowTextBasedDesign,
  toggleShouldUseAiForOnlyTips,
} = settingsSlice.actions

export default settingsSlice.reducer
