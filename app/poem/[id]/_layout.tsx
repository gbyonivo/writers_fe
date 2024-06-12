import { Stack, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'

import { PostStanzaButton } from '../../../src/components/common/stanza/post-stanza-button'
import { StanzaChainToggle } from '../../../src/components/common/stanza/stanza-chain-toggle'
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
          headerTitle: () => <></>,
          headerLeft: () => <Appbar.BackAction onPress={() => router.back()} />,
          headerRight: () => <StanzaChainToggle />,
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
          headerTitle: () => <WriterDefaultHeaderTitle />,
          headerLeft: () => (
            <WriterButton
              onPress={() => router.back()}
              style={styles.backButton}
            >
              Cancel
            </WriterButton>
          ),
          headerRight: () => <PostStanzaButton />,
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
