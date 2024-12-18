import { useQuery } from '@apollo/client'
import { Piece } from 'writers_shared'

import { GET_PIECE } from '../../queries/piece'
import { useEnhancedRefetch } from './use-enhanced-refetch'

export const usePiece = (pieceId: number) => {
  const { data, loading, error, refetch } = useQuery(GET_PIECE, {
    variables: { id: pieceId },
    skip: !pieceId,
  })

  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const piece: Piece | null = data?.piece || response?.piece
  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    refetch: enhancedRefetch,
    piece,
  }
}
