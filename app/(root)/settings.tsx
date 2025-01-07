import { useDispatch } from 'react-redux'

import { SettingsScreen } from '../../src/components/screens/settings/settings-screen'
import { useOnFocus } from '../../src/hooks/use-on-focus'
import { setCurrentScreen } from '../../src/store/slices/screen-monitor'
import { trackScreenView } from '../../src/utils/mixpanel'
import { TrackedScreen } from '../../src/utils/tracking/tracked-screen'

export default function Settings() {
  const dispatch = useDispatch()

  useOnFocus(() => {
    dispatch(setCurrentScreen(TrackedScreen.SETTINGS_SCREEN))
    trackScreenView({
      screenName: TrackedScreen.SETTINGS_SCREEN,
    })
  })
  return <SettingsScreen />
}
