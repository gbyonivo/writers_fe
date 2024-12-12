import { Stack, useRouter } from 'expo-router'
import { Appbar, useTheme } from 'react-native-paper'

import { FloatingPlayer } from '../../src/components/common/voice-player/floating-player'
import { WithSpeaker } from '../../src/components/common/voice-player/with-speaker'
import { InitialiseScreen } from '../../src/components/screens/utility/initialise-screen'
import { useInitializeApp } from '../../src/hooks/use-initialize-app'

export default function RootLayout() {
  const router = useRouter()
  const { colors } = useTheme()

  const {
    loading: initializingApp,
    error: errorInitializingApp,
    reinitialise,
  } = useInitializeApp()

  if (initializingApp || errorInitializingApp) {
    return (
      <InitialiseScreen
        error={errorInitializingApp}
        loading={initializingApp}
        reinitialise={reinitialise}
      />
    )
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="pieces/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="users/[id]"
          options={{
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.onBackground,
            headerTitle: () => <></>,
            headerLeft: () => (
              <Appbar.BackAction onPress={() => router.back()} />
            ),
          }}
        />
        <Stack.Screen
          name="player/[id]"
          options={{
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.onBackground,
            headerTitle: () => <></>,
            headerLeft: () => (
              <Appbar.BackAction onPress={() => router.back()} />
            ),
          }}
        />
      </Stack>

      <WithSpeaker>
        <FloatingPlayer />
      </WithSpeaker>
    </>
  )
}
