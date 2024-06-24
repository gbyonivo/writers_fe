import { StyleSheet, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function TermsAndConditions() {
  return (
    <SettingsItemContainer>
      <WriterText fontFamily="Bold" style={style.text}>
        View terms and conditions
      </WriterText>
    </SettingsItemContainer>
  )
}

const style = StyleSheet.create({
  text: {
    textDecorationLine: 'underline',
  },
})
