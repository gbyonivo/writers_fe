import { TouchableOpacity } from 'react-native'

import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function ChooseReader() {
  const onPress = () => {
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        screen: TrackedScreen.SETTINGS_SCREEN,
        buttonName: 'Choose default Reader',
      },
    })
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <SettingsItemContainer>
        <WriterText fontFamily="Bold">Choose voice for reader</WriterText>
      </SettingsItemContainer>
    </TouchableOpacity>
  )
}
