import React from 'react'
import { useColorScheme } from 'react-native'
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper'

import { useSelectedColorSchemeContext } from '../../context/selected-color-scheme-context'

interface Props {
  children: JSX.Element
}

export const Paper = ({ children }: Props) => {
  const colorScheme = useColorScheme()
  const { theme } = useSelectedColorSchemeContext()
  let paperTheme = colorScheme !== 'light' ? MD3LightTheme : MD3DarkTheme
  if (theme) {
    paperTheme = theme === 'light' ? MD3LightTheme : MD3DarkTheme
  }

  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>
}
