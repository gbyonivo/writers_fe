import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import { User } from 'writers_shared'
import { AppState } from '../types/states/AppState'
import { useSelector } from 'react-redux'
import { router, useNavigation, useRootNavigationState } from 'expo-router'
import { useAuth } from '../hooks/useAuth'
import {
  AuthenticateParams,
  AuthenticateReturn,
} from '../types/states/LoginState'
import { useProtectedRoute } from '../hooks/useProtectedRoute'

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
      router.replace('/(tabs)')
    } else {
      console.log('struggles')
      router.replace('/(auth)/sign-in')
    }
  }, [userId])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  )
  if (!user?.id) return null
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default AuthContextProvider
