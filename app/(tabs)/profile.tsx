import { StyleSheet, View } from 'react-native'

import { WriterAvatarImage } from '../../src/components/common/writer-avatar-image'
import { WriterBackground } from '../../src/components/common/writer-background'
import { WriterButton } from '../../src/components/common/writer-button'
import { WriterText } from '../../src/components/common/writer-text'
import { useAuthContext } from '../../src/context/auth-context'
import { useUser } from '../../src/hooks/apollo/use-user'

export default function Profile() {
  const { logout, user: loggedInUser } = useAuthContext()
  const { loading, user, error } = useUser(loggedInUser?.id)
  console.log(loading, error, user)
  return (
    <WriterBackground style={{ flex: 1 }} isView>
      <View style={styles.container}>
        <View style={{ backgroundColor: 'yellow' }}>
          <View style={[styles.avatarImageWrapper]}>
            <WriterAvatarImage style={styles.avatarImage} size={128} />
          </View>
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
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'green',
  },
  avatarImage: {
    alignSelf: 'center',
  },
  avatarImageWrapper: {
    backgroundColor: 'red',
  },
})
