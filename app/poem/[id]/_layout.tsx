import { Stack, useNavigation, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'

import { WriterButton } from '../../../src/components/common/writer-button'
import { WriterDefaultHeaderTitle } from '../../../src/components/common/writer-default-header-title'

export default function Layout() {
  const { colors } = useTheme()
  const router = useRouter()

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.onBackground,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: () => <WriterDefaultHeaderTitle />,
          headerLeft: () => <Appbar.BackAction onPress={() => router.back()} />,
        }}
      />
      <Stack.Screen
        name="new-stanza"
        options={{
          animation: 'slide_from_left',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.onBackground,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: () => <WriterDefaultHeaderTitle title="" />,
          headerLeft: () => (
            <WriterButton
              onPress={() => router.back()}
              style={styles.backButton}
            >
              Cancel
            </WriterButton>
          ),
          headerRight: () => (
            <WriterButton onPress={() => {}} disabled>
              Post
            </WriterButton>
          ),
        }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: 'transparent',
    textAlign: 'left',
    marginLeft: -16,
  },
})
