import { PieceCreationScreen } from '../../../src/components/screens/piece/piece-creation-screen'
import { useOnFocus } from '../../../src/hooks/use-on-focus'
import { trackEvent, trackScreenView } from '../../../src/utils/mixpanel'
import { TrackedEvent } from '../../../src/utils/tracking/tracked-event'
import { TrackedScreen } from '../../../src/utils/tracking/tracked-screen'

export default function NewPiece() {
  useOnFocus(() => {
    trackScreenView({
      screenName: TrackedScreen.NEW_PIECE_SCREEN,
    })
  })
  return <PieceCreationScreen />
}
