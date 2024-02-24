import { PortalProvider } from '@gorhom/portal'
import { Slot, SplashScreen } from 'expo-router'
import { Suspense, useEffect } from 'react'
import { Text } from 'react-native'
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
  const { store, persistor } = createStore()

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SelectedColorSchemeContextProvider>
          <Paper>
            <Suspense fallback={<Text>Loading...</Text>}>
              <AuthContextProvider>
                <PortalProvider>
                  <BottomSheetContextProvider>
                    <Apollo>
                      <>
                        <BottomSheetHandler />
                        <Slot />
                      </>
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
