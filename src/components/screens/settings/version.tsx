import { StyleSheet, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function Version() {
  return (
    <SettingsItemContainer>
      <View style={style.container}>
        <WriterText fontFamily="Bold">App version:</WriterText>
        <WriterText fontFamily="Bold">{DeviceInfo.getVersion()}</WriterText>
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
