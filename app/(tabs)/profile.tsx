import { Background } from '../../src/components/background'
import { Button } from 'react-native-paper'
import { useAuthContext } from '../../src/context/auth-context'
import { StyleSheet } from 'react-native'
import { useUser } from '../../src/hooks/apollo/use-user'

export default function Profile() {
  const { logout, user: loggedInUser } = useAuthContext()
  const { loading, user, error } = useUser(loggedInUser?.id)
  console.log(loading, error, user)
  return (
    <Background>
      <Button
        icon="logout"
        mode="outlined"
        onPress={logout}
        style={styles.button}
      >
        Log out
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
  },
})
