import { StyleSheet } from 'react-native'
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

// change background in constants if editted
export const darkTheme = {
  ...MD3DarkTheme,
  custom: 'property',
  colors: {
    ...MD3DarkTheme.colors,
    background: '#111827',
    linearBackground: '#1a2e05',
    tertiary: '#84cc16',
  },
}
// change background in constants if edittec
export const lightTheme = {
  ...MD3LightTheme,
  custom: 'property',
  colors: {
    ...MD3LightTheme.colors,
    background: '#e2e8f0',
    linearBackground: '#f5d0fe',
    tertiary: '#be185d',
  },
}

export const backgroundStyleBeforeAppIsMounted = StyleSheet.create({
  background: {
    backgroundColor: darkTheme.colors.background,
  },
})
