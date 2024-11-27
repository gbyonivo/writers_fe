import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Switch } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { useAuthContext } from '../../../context/auth-context'
import { togglePremiumAccount } from '../../../store/slices/settings'
import { AppState } from '../../../types/states/AppState'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function GoPremium() {
  const dispatch = useDispatch()
  const isPremiumAccount = useSelector(
    (state: AppState) => state.settings.isPremiumAccount,
  )
  const onPress = () => {
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        screen: TrackedScreen.SETTINGS_SCREEN,
        buttonName: 'Go Premium',
      },
    })
  }
  const onToggleSwitch = () => {
    if (!isPremiumAccount) {
      onPress()
    }
    dispatch(togglePremiumAccount())
  }
  return (
    <SettingsItemContainer>
      <View style={style.container}>
        <WriterText fontFamily="Bold">Premium Account</WriterText>
        <Switch value={isPremiumAccount} onValueChange={onToggleSwitch} />
      </View>
    </SettingsItemContainer>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
