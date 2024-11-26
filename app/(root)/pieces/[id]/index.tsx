import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { PieceScreen } from '../../../../src/components/screens/piece/piece-screen'
import { useOnFocus } from '../../../../src/hooks/use-on-focus'
import { setCurrentScreen } from '../../../../src/store/slices/screen-monitor'
import { setShouldChainPart } from '../../../../src/store/slices/settings'
import { trackScreenView } from '../../../../src/utils/mixpanel'
import { TrackedScreen } from '../../../../src/utils/tracking/tracked-screen'

export default function Piece() {
  const { id } = useGlobalSearchParams()
  const dispatch = useDispatch()
  const { name, partIds, locked } = useLocalSearchParams()
  useEffect(() => {
    if (locked === undefined) return
    dispatch(setShouldChainPart(locked === 'true'))
  }, [locked])

  useOnFocus(() => {
    dispatch(setCurrentScreen(TrackedScreen.PIECE_SCREEN))
    trackScreenView({
      screenName: TrackedScreen.PIECE_SCREEN,
    })
  })

  return (
    <PieceScreen
      pieceId={parseInt(id as string, 10)}
      pieceName={name as string}
      preselectedPartIds={partIds as string}
    />
  )
}
