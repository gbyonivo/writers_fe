import { Stack } from 'expo-router'
import { useTheme } from 'react-native-paper'

import { WriterDefaultHeaderTitle } from '../../src/components/common/writer-default-header-title'

export default function Layout() {
  const { colors } = useTheme()

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
          headerLeft: () => <></>,
        }}
      />
    </Stack>
  )
}
