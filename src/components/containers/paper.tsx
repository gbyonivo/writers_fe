import React from 'react'
import { useColorScheme } from 'react-native'
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  useTheme,
} from 'react-native-paper'

import { useSelectedColorSchemeContext } from '../../context/selected-color-scheme-context'

interface Props {
  children: JSX.Element
}

const darkTheme = {
  ...MD3DarkTheme,

  // Specify a custom property
  custom: 'property',

  // Specify a custom property in nested object
  colors: {
    ...MD3DarkTheme.colors,
    background: '#0c0a09',
  },
}

export type AppTheme = typeof darkTheme

// export const useAppTheme = () => useTheme<AppTheme>()

export function Paper({ children }: Props) {
  const colorScheme = useColorScheme()
  const { theme } = useSelectedColorSchemeContext()
  let paperTheme = colorScheme !== 'light' ? MD3LightTheme : darkTheme
  if (theme) {
    paperTheme = theme === 'light' ? MD3LightTheme : darkTheme
  }

  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>
}
