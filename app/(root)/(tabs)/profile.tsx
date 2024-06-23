import { ProfileContent } from '../../../src/components/screens/profile/profile-content'
import { useAuthContext } from '../../../src/context/auth-context'

export default function Profile() {
  const { user: loggedInUser } = useAuthContext()
  return <ProfileContent userId={loggedInUser?.id} />
}
