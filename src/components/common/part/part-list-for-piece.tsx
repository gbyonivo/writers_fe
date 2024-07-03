import { useMemo } from 'react'
import { View } from 'react-native'

import { usePieceParts } from '../../../hooks/apollo/use-piece-parts'
import { PartList } from './part-list'

interface Props {
  pieceId: number
}

export function PartListForPiece({ pieceId }: Props) {
  const {
    loading: loadingPieceParts,
    parts,
    error: errorFetchingPieceParts,
    refetch: refetchPieceParts,
  } = usePieceParts(pieceId)

  const memoedPart = useMemo(() => (parts ? parts : []), [parts])

  return !!memoedPart && memoedPart.length > 0 ? (
    <PartList
      error={errorFetchingPieceParts}
      parts={memoedPart}
      refetch={refetchPieceParts}
      loading={loadingPieceParts}
      pieceId={pieceId}
    />
  ) : (
    <View />
  )
}
