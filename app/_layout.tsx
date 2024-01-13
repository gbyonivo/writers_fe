import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { Slot, SplashScreen } from 'expo-router'
import { Suspense, useEffect } from 'react'
import { Text, useColorScheme } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { Apollo } from '../src/context/apollo'
import AuthContextProvider from '../src/context/auth-context'
import { createStore } from '../src/store/store'

export const unstable_settings = {
  initialRouteName: '(auth)/sign-in',
}

export default function AppLayout() {
  const { store, persistor } = createStore()
  const colorScheme = useColorScheme()

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <Suspense fallback={<Text>Loading...</Text>}>
            <ThemeProvider
              value={colorScheme === 'light' ? DefaultTheme : DarkTheme}
            >
              <AuthContextProvider>
                <Apollo>
                  <Slot />
                </Apollo>
              </AuthContextProvider>
            </ThemeProvider>
          </Suspense>
        </PaperProvider>
      </PersistGate>
    </Provider>
  )
}
