import { Stack, useRouter } from 'expo-router'
import { Appbar, useTheme } from 'react-native-paper'

export default function RootLayout() {
  const router = useRouter()
  const { colors } = useTheme()

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="poems/[id]"
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
          headerLeft: () => <Appbar.BackAction onPress={() => router.back()} />,
        }}
      />
    </Stack>
  )
}
