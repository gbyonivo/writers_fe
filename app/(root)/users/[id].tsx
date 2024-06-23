import { useGlobalSearchParams } from 'expo-router'

import { ProfileContent } from '../../../src/components/screens/profile/profile-content'
import { useAuthContext } from '../../../src/context/auth-context'

export default function User() {
  const { id } = useGlobalSearchParams()
  return <ProfileContent userId={parseInt(id as string, 10)} />
}
