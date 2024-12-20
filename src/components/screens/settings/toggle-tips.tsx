import { StyleSheet, View } from 'react-native'
import { Switch } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { toggleShouldUseAiForOnlyTips } from '../../../store/slices/settings'
import { AppState } from '../../../types/states/AppState'
import { WriterSwitch } from '../../common/writer-switch'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function ToggleTips() {
  const dispatch = useDispatch()
  const shouldUseAiForOnlyTips = useSelector(
    (state: AppState) => state.settings.shouldUseAiForOnlyTips,
  )
  const onToggleSwitch = () => {
    dispatch(toggleShouldUseAiForOnlyTips())
  }
  return (
    <SettingsItemContainer>
      <View style={style.container}>
        <WriterText fontFamily="Bold">AI for only tips</WriterText>
        <WriterSwitch
          value={shouldUseAiForOnlyTips}
          handleChange={onToggleSwitch}
        />
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
