import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { Provider } from 'react-redux'
import { Text, useColorScheme } from 'react-native'
import { Suspense, useEffect } from 'react'
import { Slot, SplashScreen } from 'expo-router'
import { PaperProvider } from 'react-native-paper'
import { createStore } from '../src/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import AuthContextProvider from '../src/context/auth-context'

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
              {/* <AuthContextProvider> */}
              <Slot />
              {/* </AuthContextProvider> */}
            </ThemeProvider>
          </Suspense>
        </PaperProvider>
      </PersistGate>
    </Provider>
  )
}
