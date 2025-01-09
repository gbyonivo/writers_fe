import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Theme } from '../../types/Theme'
import { SettingsState } from '../../types/states/SettingState'
import { USABLE_IMAGE_URLS } from '../../utils/common'

const initialState: SettingsState = {
  theme: null,
  shouldChainParts: false,
  shouldShowTextBasedDesign: true,
  shouldUseAiForOnlyTips: true,
  isAdmin: false,
  images: USABLE_IMAGE_URLS,
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
    becomeAdmin: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        isAdmin: payload === 'BEAR',
      }
    },
    addImages: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        images: [...new Set([...state.images, payload])],
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
  becomeAdmin,
  addImages,
} = settingsSlice.actions

export default settingsSlice.reducer
