import { Portal } from 'react-native-paper'

import { useBottomSheetContext } from '../../context/bottom-sheet-context'
import { BottomSheet } from '../../types/bottom-sheet'
import { LogoutBottomSheet } from './logout-bottom-sheet'

const bottomSheetMap = {
  [BottomSheet.LOGOUT]: LogoutBottomSheet,
}

export const BottomSheetHandler = () => {
  const { bottomSheet, resetBottomSheet, params } = useBottomSheetContext()
  let element = null
  switch (bottomSheet) {
    case BottomSheet.LOGOUT:
      element = (
        <LogoutBottomSheet
          onClose={() => resetBottomSheet()}
          onPressLogout={params.onPressLogout}
        />
      )
      break
    default:
      element = null
  }

  if (element) {
    return <Portal>{element}</Portal>
  }
  return null
}
