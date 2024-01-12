import { Background } from '../../src/components/background'
import { Button } from 'react-native-paper'
import { useAuthContext } from '../../src/context/auth-context'

export default function Profile() {
  const { logout } = useAuthContext()
  return (
    <Background>
      <Button icon="logout" mode="contained" onPress={logout}>
        Log out
      </Button>
    </Background>
  )
}
