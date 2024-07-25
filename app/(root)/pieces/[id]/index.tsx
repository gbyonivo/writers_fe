import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { PieceScreen } from '../../../../src/components/screens/piece/piece-screen'
import { setShouldChainPart } from '../../../../src/store/slices/settings'

export default function Piece() {
  const { id } = useGlobalSearchParams()
  const dispatch = useDispatch()
  const { name, partIds, locked } = useLocalSearchParams()
  useEffect(() => {
    if (locked === undefined) return
    dispatch(setShouldChainPart(locked === 'true'))
  }, [locked])

  return (
    <PieceScreen
      pieceId={parseInt(id as string, 10)}
      pieceName={name as string}
      preselectedPartIds={partIds as string}
    />
  )
}
