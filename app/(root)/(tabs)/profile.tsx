import { ProfileContent } from '../../../src/components/screens/profile/profile-content'
import { useAuthContext } from '../../../src/context/auth-context'
import { useOnFocus } from '../../../src/hooks/use-on-focus'
import { trackEvent, trackScreenView } from '../../../src/utils/mixpanel'
import { TrackedEvent } from '../../../src/utils/tracking/tracked-event'
import { TrackedScreen } from '../../../src/utils/tracking/tracked-screen'

export default function Profile() {
  useOnFocus(() => {
    trackScreenView({
      screenName: TrackedScreen.PROFILE_SCREEN,
    })
  })

  const { user: loggedInUser } = useAuthContext()
  return <ProfileContent userId={loggedInUser?.id} />
}
