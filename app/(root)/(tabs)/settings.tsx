import { SettingsScreen } from '../../../src/components/screens/settings/settings-screen'
import { useOnFocus } from '../../../src/hooks/use-on-focus'
import { trackEvent, trackScreenView } from '../../../src/utils/mixpanel'
import { TrackedEvent } from '../../../src/utils/tracking/tracked-event'
import { TrackedScreen } from '../../../src/utils/tracking/tracked-screen'

export default function Settings() {
  useOnFocus(() => {
    trackScreenView({
      screenName: TrackedScreen.SETTINGS_SCREEN,
    })
  })
  return <SettingsScreen />
}
