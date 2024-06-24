import { TouchableOpacity, View } from 'react-native'

import { useAuthContext } from '../../../context/auth-context'
import { useBottomSheetContext } from '../../../context/bottom-sheet-context'
import { BottomSheet } from '../../../types/bottom-sheet'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function Logout() {
  const { selectBottomSheet, resetBottomSheet } = useBottomSheetContext()
  const { logout } = useAuthContext()

  return (
    <TouchableOpacity
      onPress={() =>
        selectBottomSheet({
          bottomSheet: BottomSheet.LOGOUT,
          params: {
            onPressLogout: () => {
              logout()
              resetBottomSheet()
            },
          },
        })
      }
    >
      <SettingsItemContainer>
        <WriterText fontFamily="Bold">Logout</WriterText>
      </SettingsItemContainer>
    </TouchableOpacity>
  )
}
