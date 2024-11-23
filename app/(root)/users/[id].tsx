import { useGlobalSearchParams } from 'expo-router'

import { ProfileContent } from '../../../src/components/screens/profile/profile-content'
import { useAuthContext } from '../../../src/context/auth-context'
import { useOnFocus } from '../../../src/hooks/use-on-focus'
import { trackScreenView } from '../../../src/utils/mixpanel'
import { TrackedScreen } from '../../../src/utils/tracking/tracked-screen'

export default function User() {
  const { id } = useGlobalSearchParams()
  useOnFocus(() => {
    trackScreenView({
      screenName: TrackedScreen.USER_SCREEN,
      params: {
        id,
      },
    })
  })
  return <ProfileContent userId={parseInt(id as string, 10)} />
}
