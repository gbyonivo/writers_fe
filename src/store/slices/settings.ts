import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Theme } from '../../types/Theme'
import { SettingsState } from '../../types/states/SettingState'

const initialState: SettingsState = {
  theme: null,
  shouldChainParts: false,
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
  },
})

export const { setTheme, toggleShouldChainPart } = settingsSlice.actions

export default settingsSlice.reducer
