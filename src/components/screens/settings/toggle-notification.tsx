import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { WriterSwitch } from '../../common/writer-switch'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function ToggleNotification() {
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

  return (
    <SettingsItemContainer>
      <View style={style.container}>
        <WriterText fontFamily="Bold">Notifications</WriterText>
        <WriterSwitch value={isSwitchOn} handleChange={onToggleSwitch} />
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
