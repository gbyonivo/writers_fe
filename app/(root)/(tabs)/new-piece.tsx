import { useDispatch } from 'react-redux'

import { PieceCreationScreen } from '../../../src/components/screens/piece/piece-creation-screen'
import { useOnFocus } from '../../../src/hooks/use-on-focus'
import { setCurrentScreen } from '../../../src/store/slices/screen-monitor'
import { trackEvent, trackScreenView } from '../../../src/utils/mixpanel'
import { TrackedEvent } from '../../../src/utils/tracking/tracked-event'
import { TrackedScreen } from '../../../src/utils/tracking/tracked-screen'

export default function NewPiece() {
  const dispatch = useDispatch()
  useOnFocus(() => {
    dispatch(setCurrentScreen(TrackedScreen.NEW_PIECE_SCREEN))
    trackScreenView({
      screenName: TrackedScreen.NEW_PIECE_SCREEN,
    })
  })
  return <PieceCreationScreen />
}
