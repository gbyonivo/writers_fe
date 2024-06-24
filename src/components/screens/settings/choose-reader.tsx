import { TouchableOpacity } from 'react-native'

import { useAuthContext } from '../../../context/auth-context'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function ChooseReader() {
  const { logout } = useAuthContext()

  const onPress = () => {}

  return (
    <TouchableOpacity onPress={onPress}>
      <SettingsItemContainer>
        <WriterText fontFamily="Bold">Choose voice for reader</WriterText>
      </SettingsItemContainer>
    </TouchableOpacity>
  )
}
