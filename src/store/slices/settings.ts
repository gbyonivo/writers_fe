import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { AddUserParams, LoginState } from '../../types/states/LoginState'
import { SettingsState } from '../../types/states/SettingState'
import { Theme } from '../../types/Theme'

const initialState: SettingsState = {
  theme: null,
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
  },
})

export const { setTheme } = settingsSlice.actions

export default settingsSlice.reducer
