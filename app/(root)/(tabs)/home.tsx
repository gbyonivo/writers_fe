import { useDispatch } from 'react-redux'

import { HomeScreen } from '../../../src/components/screens/home/home-screen'
import { useOnFocus } from '../../../src/hooks/use-on-focus'
import { setCurrentScreen } from '../../../src/store/slices/screen-monitor'
import { trackScreenView } from '../../../src/utils/mixpanel'
import { TrackedScreen } from '../../../src/utils/tracking/tracked-screen'

export default function Home() {
  const dispatch = useDispatch()
  useOnFocus(() => {
    dispatch(setCurrentScreen(TrackedScreen.HOME_SCREEN))
    trackScreenView({
      screenName: TrackedScreen.HOME_SCREEN,
    })
  })

  return <HomeScreen />
}
