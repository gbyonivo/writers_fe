import { TouchableOpacity, View } from 'react-native'

import { useAuthContext } from '../../../context/auth-context'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function GoPremium() {
  const onPress = () => {
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        screen: TrackedScreen.SETTINGS_SCREEN,
        buttonName: 'Go Premium',
      },
    })
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <SettingsItemContainer>
        <WriterText fontFamily="Bold">Go Premium</WriterText>
      </SettingsItemContainer>
    </TouchableOpacity>
  )
}
