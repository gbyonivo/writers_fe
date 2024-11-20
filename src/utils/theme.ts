import { StyleSheet } from 'react-native'
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

// change background in constants if editted
export const darkTheme = {
  ...MD3DarkTheme,
  custom: 'property',
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#dbeafe',
  },
}
// change background in constants if edittec
export const lightTheme = {
  ...MD3LightTheme,
  custom: 'property',
  colors: {
    ...MD3LightTheme.colors,
  },
}

export const backgroundStyleBeforeAppIsMounted = StyleSheet.create({
  background: {
    backgroundColor: darkTheme.colors.background,
  },
})
