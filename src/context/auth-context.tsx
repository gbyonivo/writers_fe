import { router } from 'expo-router'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { User } from 'writers_shared'

import { useAuth } from '../hooks/use-auth'
import { useProtectedRoute } from '../hooks/use-protected-route'
import { AppState } from '../types/states/AppState'
import {
  AuthenticateParams,
  AuthenticateReturn,
} from '../types/states/LoginState'

interface IAuthContext {
  user: User
  login: (value: AuthenticateParams) => Promise<AuthenticateReturn>
  logout: () => void
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

export function useAuthContext(): IAuthContext {
  const context = React.useContext<IAuthContext>(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a Provider')
  }

  return context
}

function AuthContextProvider({ children }) {
  const { login, logout } = useAuth()
  const { user } = useSelector((state: AppState) => state.login)
  const userId = user?.id
  useProtectedRoute(user)

  useEffect(() => {
    if (userId) {
      router.replace('(root)/(tabs)/home')
    } else {
      router.replace('/(auth)/sign-in')
    }
  }, [userId])

  const value = useMemo(
    () => ({
      user: user,
      login,
      logout,
    }),
    [user],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default AuthContextProvider
