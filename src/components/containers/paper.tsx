import React from 'react'
import { useColorScheme } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import { useSelectedColorSchemeContext } from '../../context/selected-color-scheme-context'
import { darkTheme, lightTheme } from '../../utils/theme'

interface Props {
  children: JSX.Element
}

export type AppTheme = typeof darkTheme

export function Paper({ children }: Props) {
  const colorScheme = useColorScheme()
  const { theme } = useSelectedColorSchemeContext()
  let paperTheme = colorScheme !== 'light' ? lightTheme : darkTheme
  if (theme) {
    paperTheme = theme === 'light' ? lightTheme : darkTheme
  }

  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>
}
