import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'

import { PieceScreen } from '../../../../src/components/screens/piece/piece-screen'

export default function Piece() {
  const { id } = useGlobalSearchParams()
  const { name } = useLocalSearchParams()
  return (
    <PieceScreen
      pieceId={parseInt(id as string, 10)}
      pieceName={name as string}
    />
  )
}
