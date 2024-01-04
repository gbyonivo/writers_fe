import { Text, TamaguiProvider, Theme } from 'tamagui'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import config from '../tamagui.config'
import { useColorScheme } from 'react-native'
import { Suspense } from 'react'
import { Stack } from 'expo-router'

export default function AppLayout() {
  const colorScheme = useColorScheme()
  return (
    <TamaguiProvider config={config}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Theme name={colorScheme}>
          <ThemeProvider
            value={colorScheme === 'light' ? DefaultTheme : DarkTheme}
          >
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            ></Stack>
          </ThemeProvider>
        </Theme>
      </Suspense>
    </TamaguiProvider>
  )
}
