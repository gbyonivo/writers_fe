import { useQuery } from '@apollo/client'
import { Piece } from 'writers_shared'

import { GET_PIECE } from '../../queries/piece'

export const usePiece = (pieceId: number) => {
  const { data, loading, error, refetch } = useQuery(GET_PIECE, {
    variables: { id: pieceId },
  })

  const piece: Piece | null = data?.piece
  return {
    loading,
    error,
    piece,
    refetch: () => {
      if (loading) return
      refetch()
    },
  }
}
