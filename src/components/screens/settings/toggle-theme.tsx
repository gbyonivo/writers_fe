import { StyleSheet, View } from 'react-native'
import { Switch } from 'react-native-paper'

import { useSelectedColorSchemeContext } from '../../../context/selected-color-scheme-context'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function ToggleTheme() {
  const { selectTheme, theme } = useSelectedColorSchemeContext()
  const isDark = !theme || theme === 'dark'
  const onToggleSwitch = () => {
    selectTheme(isDark ? 'light' : 'dark')
  }

  return (
    <SettingsItemContainer>
      <View style={style.container}>
        <WriterText fontFamily="Bold">Dark Theme</WriterText>
        <Switch value={isDark} onValueChange={onToggleSwitch} />
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
