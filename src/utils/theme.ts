import { StyleSheet } from 'react-native'
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

// change background in constants if editted
export const darkTheme = {
  ...MD3DarkTheme,
  custom: 'property',
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#dbeafe',
    background: '#030712',
  },
}
// change background in constants if edittec
export const lightTheme = {
  ...MD3LightTheme,
  custom: 'property',
  colors: {
    ...MD3LightTheme.colors,
    background: '#e2e8f0',
    backdrop: 'rgba(51, 58, 46, 0.03)',
  },
}

export const backgroundStyleBeforeAppIsMounted = StyleSheet.create({
  background: {
    backgroundColor: darkTheme.colors.background,
  },
})
