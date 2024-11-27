import { useRef } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterText } from '../../common/writer-text'
import { LogoutBottomSheet } from '../profile/logout-bottom-sheet'
import { SettingsItemContainer } from './settings-item-container'

export function Logout() {
  const logoutBottomsheetRef = useRef(null)

  return (
    <View>
      <LogoutBottomSheet ref={logoutBottomsheetRef} />
      <TouchableOpacity
        onPress={() => {
          trackEvent({
            event: TrackedEvent.PRESS,
            params: {
              screen: TrackedScreen.SETTINGS_SCREEN,
              buttonName: 'Logout',
            },
          })
          logoutBottomsheetRef.current.expand()
        }}
      >
        <SettingsItemContainer>
          <WriterText fontFamily="Bold">Logout</WriterText>
        </SettingsItemContainer>
      </TouchableOpacity>
    </View>
  )
}
