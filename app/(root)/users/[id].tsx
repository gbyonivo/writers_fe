import { useGlobalSearchParams } from 'expo-router'
import { useDispatch } from 'react-redux'

import { ProfileContent } from '../../../src/components/screens/profile/profile-content'
import { useOnFocus } from '../../../src/hooks/use-on-focus'
import { setCurrentScreen } from '../../../src/store/slices/screen-monitor'
import { trackScreenView } from '../../../src/utils/mixpanel'
import { TrackedScreen } from '../../../src/utils/tracking/tracked-screen'

export default function User() {
  const { id } = useGlobalSearchParams()
  const dispatch = useDispatch()
  useOnFocus(() => {
    dispatch(setCurrentScreen(TrackedScreen.USER_SCREEN))
    trackScreenView({
      screenName: TrackedScreen.USER_SCREEN,
      params: {
        id,
      },
    })
  })
  return <ProfileContent userId={parseInt(id as string, 10)} />
}
