import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import { WriterBackground } from '../../src/components/writer-background'
import { useAuthContext } from '../../src/context/auth-context'
import { useUser } from '../../src/hooks/apollo/use-user'

export default function Profile() {
  const { logout, user: loggedInUser } = useAuthContext()
  const { loading, user, error } = useUser(loggedInUser?.id)
  console.log(loading, error, user)
  return (
    <WriterBackground>
      <Button
        icon="logout"
        mode="outlined"
        onPress={logout}
        style={styles.button}
      >
        Log outffff
      </Button>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
  },
})
