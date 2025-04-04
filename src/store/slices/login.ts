import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { AddUserParams, LoginState } from '../../types/states/LoginState'

const initialState: LoginState = {
  token: '',
  user: null,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    addUser: (
      state,
      { payload: { user, token } }: PayloadAction<AddUserParams>,
    ) => {
      return {
        ...state,
        user,
        token,
      }
    },
    removeUser: (state) => {
      return {
        ...state,
        user: null,
        token: '',
      }
    },
    setAccountType: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        user: {
          ...state.user,
          accountType: payload,
        },
      }
    },
  },
})

export const { addUser, removeUser, setAccountType } = loginSlice.actions

export default loginSlice.reducer
