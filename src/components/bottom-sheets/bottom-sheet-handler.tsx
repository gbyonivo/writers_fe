import { Portal } from 'react-native-paper'

import { useBottomSheetContext } from '../../context/bottom-sheet-context'
import { BottomSheet } from '../../types/bottom-sheet'
import { LogoutBottomSheet } from './logout-bottom-sheet'
import { StanzaRatingBottomSheet } from './stanza-rating-bottom-sheet'

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
    case BottomSheet.STANZA_RATING:
      element = (
        <StanzaRatingBottomSheet
          onClose={() => resetBottomSheet()}
          stanza={params.stanza}
          rateStanza={params.rateStanza}
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
