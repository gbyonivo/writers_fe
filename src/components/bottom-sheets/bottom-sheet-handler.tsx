import { Portal } from 'react-native-paper'

import { useBottomSheetContext } from '../../context/bottom-sheet-context'
import { BottomSheet } from '../../types/bottom-sheet'
import { LogoutBottomSheet } from './logout-bottom-sheet'
import { PartRatingBottomSheet } from './part-rating-bottom-sheet'

export function BottomSheetHandler() {
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
    case BottomSheet.PART_RATING:
      element = (
        <PartRatingBottomSheet
          onClose={() => resetBottomSheet()}
          part={params.part}
          ratePart={params.ratePart}
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
