import { StyleSheet, View } from 'react-native'
import { Switch } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { setShouldShowTextBasedDesign } from '../../../store/slices/settings'
import { AppState } from '../../../types/states/AppState'
import { WriterSwitch } from '../../common/writer-switch'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function ToggleDesign() {
  const dispatch = useDispatch()
  const isTextual = useSelector(
    (state: AppState) => state.settings.shouldShowTextBasedDesign,
  )
  const onToggleSwitch = () => {
    dispatch(setShouldShowTextBasedDesign(!isTextual))
  }

  return (
    <SettingsItemContainer>
      <View style={style.container}>
        <WriterText fontFamily="Bold">Textbased Design (disabled)</WriterText>
        <WriterSwitch value={true} handleChange={onToggleSwitch} disabled />
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
