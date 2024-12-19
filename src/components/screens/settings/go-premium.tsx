import { StyleSheet, View } from 'react-native'
import { Switch } from 'react-native-paper'

import { useAccountTypeMutation } from '../../../hooks/apollo/use-account-type-mutation'
import { useIsPremium } from '../../../hooks/use-is-premium'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function GoPremium() {
  const isPremiumAccount = useIsPremium()
  const { updateAccountType } = useAccountTypeMutation()
  const onToggleSwitch = async () => {
    const accountType = isPremiumAccount ? 'STANDARD' : 'PREMIUM'
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        screen: TrackedScreen.SETTINGS_SCREEN,
        buttonName: 'Go Premium',
        accountType,
      },
    })
    await updateAccountType({ accountType })
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
