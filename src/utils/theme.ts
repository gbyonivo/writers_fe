import { StyleSheet } from 'react-native'
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

// change background in constants if editted
export const darkTheme = {
  ...MD3DarkTheme,
  custom: 'property',
  colors: {
    ...MD3DarkTheme.colors,
    background: '#09090b',
    scrim: '#18181b', // used as linear background
    outlineVariant: '#db2777',
    // outlineVariant: '#f97316', // highlight
  },
}
// change background in constants if edittec
export const lightTheme = {
  ...MD3LightTheme,
  custom: 'property',
  colors: {
    ...MD3LightTheme.colors,
    background: '#e2e8f0',
    scrim: '#ddd6fe', // used as linear background
    outlineVariant: '#991b1b', // highlight
  },
}

export const backgroundStyleBeforeAppIsMounted = StyleSheet.create({
  background: {
    backgroundColor: darkTheme.colors.background,
  },
})
