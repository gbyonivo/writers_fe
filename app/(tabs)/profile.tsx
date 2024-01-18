import { StyleSheet, View } from 'react-native'

import { WriterAvatarImage } from '../../src/components/writer-avatar-image'
import { WriterBackground } from '../../src/components/writer-background'
import { WriterButton } from '../../src/components/writer-button'
import { WriterText } from '../../src/components/writer-text'
import { useAuthContext } from '../../src/context/auth-context'
import { useUser } from '../../src/hooks/apollo/use-user'

export default function Profile() {
  const { logout, user: loggedInUser } = useAuthContext()
  const { loading, user, error } = useUser(loggedInUser?.id)
  return (
    <WriterBackground>
      <View style={styles.container}>
        <View>
          <WriterAvatarImage style={styles.avatarImage} size={128} />
          <WriterText>Sign out</WriterText>
        </View>
        <WriterButton icon="logout" onPress={logout} style={styles.button}>
          Log out
        </WriterButton>
      </View>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  avatarImage: {
    alignSelf: 'center',
  },
})
