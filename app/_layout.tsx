import { PortalProvider } from '@gorhom/portal'
import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper'
import { ToastProvider } from 'react-native-toast-notifications'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { BottomSheetHandler } from '../src/components/bottom-sheets/bottom-sheet-handler'
import { Apollo } from '../src/components/containers/apollo'
import { Paper } from '../src/components/containers/paper'
import AuthContextProvider from '../src/context/auth-context'
import BottomSheetContextProvider from '../src/context/bottom-sheet-context'
import SelectedColorSchemeContextProvider from '../src/context/selected-color-scheme-context'
import { createStore } from '../src/store/store'

const error = console.error
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return
  error(...args)
}

export const unstable_settings = {
  initialRouteName: '(auth)/sign-in',
}

SplashScreen.preventAutoHideAsync()

export default function AppLayout() {
  const [appMounted, setAppMounted] = useState(false)
  const [fontsLoaded, fontError] = useFonts({
    Light: require('../src/assets/fonts/Poppins-Light.ttf'),
    Bold: require('../src/assets/fonts/Poppins-Bold.ttf'),
    ExtraLight: require('../src/assets/fonts/Poppins-ExtraLight.ttf'),
    Regular: require('../src/assets/fonts/Poppins-Regular.ttf'),
    SemiBold: require('../src/assets/fonts/Poppins-SemiBold.ttf'),
    Medium: require('../src/assets/fonts/Poppins-Medium.ttf'),
    Thin: require('../src/assets/fonts/Poppins-Thin.ttf'),
  })

  const storeItems = useRef({
    store: null,
    persistor: null,
  })

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  useEffect(() => {
    const initApp = async () => {
      const { store, persistor } = await createStore()
      storeItems.current = { store, persistor }
      setAppMounted(true)
    }
    initApp()
  }, [])

  if (!appMounted) return null
  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <Provider store={storeItems.current.store}>
      <PersistGate loading={null} persistor={storeItems.current.persistor}>
        <SelectedColorSchemeContextProvider>
          <Paper>
            <Suspense fallback={<Text>Loading...</Text>}>
              <AuthContextProvider>
                <GestureHandlerRootView>
                  <PortalProvider>
                    <BottomSheetContextProvider>
                      <Apollo>
                        <ToastProvider>
                          <>
                            <BottomSheetHandler />
                            <Slot />
                          </>
                        </ToastProvider>
                      </Apollo>
                    </BottomSheetContextProvider>
                  </PortalProvider>
                </GestureHandlerRootView>
              </AuthContextProvider>
            </Suspense>
          </Paper>
        </SelectedColorSchemeContextProvider>
      </PersistGate>
    </Provider>
  )
}
