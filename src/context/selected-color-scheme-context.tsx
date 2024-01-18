import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setTheme } from '../store/slices/settings'
import { Theme } from '../types/Theme'
import { AppState } from '../types/states/AppState'

interface ISelectedColorSchemeContext {
  theme: Theme | null
  selectTheme: (theme: Theme) => void
  removeTheme: () => void
}

export const SelectedColorSchemeContext =
  React.createContext<ISelectedColorSchemeContext>(
    {} as ISelectedColorSchemeContext,
  )

export function useSelectedColorSchemeContext(): ISelectedColorSchemeContext {
  const context = React.useContext<ISelectedColorSchemeContext>(
    SelectedColorSchemeContext,
  )

  if (context === undefined) {
    throw new Error('useSelectedColorScheme must be used within a Provider')
  }

  return context
}

function SelectedColorSchemeContextProvider({ children }) {
  const theme = useSelector((state: AppState) => state.settings.theme)
  const dispatch = useDispatch()
  const selectTheme = useCallback(
    (theme: Theme) => dispatch(setTheme(theme)),
    [],
  )
  const removeTheme = useCallback(() => {
    dispatch(setTheme(null))
  }, [])

  const value = useMemo(
    () => ({
      theme: theme || 'light',
      removeTheme,
      selectTheme,
    }),
    [theme],
  )
  return (
    <SelectedColorSchemeContext.Provider value={value}>
      {children}
    </SelectedColorSchemeContext.Provider>
  )
}

SelectedColorSchemeContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default SelectedColorSchemeContextProvider
