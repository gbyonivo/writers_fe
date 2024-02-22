import { Stack, useNavigation, useRouter } from 'expo-router'
import { Appbar, useTheme } from 'react-native-paper'

import { WriterDefaultHeaderTitle } from '../../src/components/common/writer-default-header-title'

export default function Layout() {
  const { colors } = useTheme()
  const router = useRouter()
  const nav = useNavigation()

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.onBackground,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: () => <WriterDefaultHeaderTitle />,
          headerLeft: () => <Appbar.BackAction onPress={() => nav.goBack()} />,
        }}
      />
    </Stack>
  )
}
