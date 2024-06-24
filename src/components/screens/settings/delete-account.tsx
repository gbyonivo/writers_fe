import { TouchableOpacity, View } from 'react-native'

import { useAuthContext } from '../../../context/auth-context'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function DeleteAccount() {
  const onPress = () => {}
  return (
    <TouchableOpacity onPress={onPress}>
      <SettingsItemContainer>
        <WriterText fontFamily="Bold">Delete My Account</WriterText>
      </SettingsItemContainer>
    </TouchableOpacity>
  )
}
