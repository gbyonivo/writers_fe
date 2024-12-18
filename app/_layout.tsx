import { PortalProvider } from '@gorhom/portal'
import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ToastProvider } from 'react-native-toast-notifications'
import TrackPlayer from 'react-native-track-player'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { WriterBackground } from '../src/components/common/writer-background'
import { Apollo } from '../src/components/containers/apollo'
import { Paper } from '../src/components/containers/paper'
import AuthContextProvider from '../src/context/auth-context'
import SelectedColorSchemeContextProvider from '../src/context/selected-color-scheme-context'
import { createStore } from '../src/store/store'
import { PlaybackService } from '../src/utils/audio-service'
import { backgroundStyleBeforeAppIsMounted } from '../src/utils/theme'

const error = console.error
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return
  error(...args)
}

TrackPlayer.registerPlaybackService(() => PlaybackService)

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
      await TrackPlayer.setupPlayer()
      storeItems.current = { store, persistor }
      setAppMounted(true)
    }
    initApp()
  }, [])

  if (!appMounted) {
    return (
      <WriterBackground
        isView
        style={backgroundStyleBeforeAppIsMounted.background}
      />
    )
  }
  if (!fontsLoaded && !fontError) {
    return (
      <WriterBackground
        isView
        style={backgroundStyleBeforeAppIsMounted.background}
      />
    )
  }

  return (
    <WriterBackground
      isView
      style={backgroundStyleBeforeAppIsMounted.background}
    >
      <Provider store={storeItems.current.store}>
        <PersistGate loading={null} persistor={storeItems.current.persistor}>
          <SelectedColorSchemeContextProvider>
            <Paper>
              <Suspense fallback={<Text>Loading...</Text>}>
                <AuthContextProvider>
                  <GestureHandlerRootView>
                    <PortalProvider>
                      <Apollo>
                        <ToastProvider>
                          <Slot />
                        </ToastProvider>
                      </Apollo>
                    </PortalProvider>
                  </GestureHandlerRootView>
                </AuthContextProvider>
              </Suspense>
            </Paper>
          </SelectedColorSchemeContextProvider>
        </PersistGate>
      </Provider>
    </WriterBackground>
  )
}
