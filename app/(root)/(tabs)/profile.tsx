import { useDispatch } from 'react-redux'

import { ProfileContent } from '../../../src/components/screens/profile/profile-content'
import { useAuthContext } from '../../../src/context/auth-context'
import { useOnFocus } from '../../../src/hooks/use-on-focus'
import { setCurrentScreen } from '../../../src/store/slices/screen-monitor'
import { trackEvent, trackScreenView } from '../../../src/utils/mixpanel'
import { TrackedEvent } from '../../../src/utils/tracking/tracked-event'
import { TrackedScreen } from '../../../src/utils/tracking/tracked-screen'

export default function Profile() {
  const dispatch = useDispatch()
  useOnFocus(() => {
    dispatch(setCurrentScreen(TrackedScreen.PROFILE_SCREEN))
    trackScreenView({
      screenName: TrackedScreen.PROFILE_SCREEN,
    })
  })

  const { user: loggedInUser } = useAuthContext()
  return <ProfileContent userId={loggedInUser?.id} />
}
