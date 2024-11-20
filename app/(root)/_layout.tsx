import { Stack, useRouter } from 'expo-router'
import { Appbar, useTheme } from 'react-native-paper'

import { FloatingPlayer } from '../../src/components/common/voice-player/floating-player'
import { WithSpeaker } from '../../src/components/common/voice-player/with-speaker'
import { WriterBackground } from '../../src/components/common/writer-background'
import { useInitializeApp } from '../../src/hooks/use-initialize-app'
import { backgroundStyleBeforeAppIsMounted } from '../../src/utils/theme'

export default function RootLayout() {
  const router = useRouter()
  const { colors } = useTheme()

  const { loading: initializingApp, error: errorInitializingApp } =
    useInitializeApp()

  if (initializingApp) {
    return (
      <WriterBackground
        isView
        style={backgroundStyleBeforeAppIsMounted.background}
      />
    )
  }
  if (errorInitializingApp) {
    return (
      <WriterBackground
        isView
        style={backgroundStyleBeforeAppIsMounted.background}
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
      </Stack>

      <WithSpeaker>
        <FloatingPlayer />
      </WithSpeaker>
    </>
  )
}
