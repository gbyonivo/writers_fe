import { PortalProvider } from '@gorhom/portal'
import { Slot, SplashScreen } from 'expo-router'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Text } from 'react-native'
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

export const unstable_settings = {
  initialRouteName: '(auth)/sign-in',
}

export default function AppLayout() {
  const [appMounted, setAppMounted] = useState(false)
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

  return (
    <Provider store={storeItems.current.store}>
      <PersistGate loading={null} persistor={storeItems.current.persistor}>
        <SelectedColorSchemeContextProvider>
          <Paper>
            <Suspense fallback={<Text>Loading...</Text>}>
              <AuthContextProvider>
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
              </AuthContextProvider>
            </Suspense>
          </Paper>
        </SelectedColorSchemeContextProvider>
      </PersistGate>
    </Provider>
  )
}
