import { useQuery } from '@apollo/client'
import { Part } from 'writers_shared'

import { GET_PIECE_PARTS } from '../../queries/piece'

export const usePieceParts = (pieceId: number) => {
  const { data, loading, error, refetch } = useQuery(GET_PIECE_PARTS, {
    variables: { id: pieceId },
    skip: !pieceId,
  })

  const parts: Part[] | null = data?.pieceParts
  return {
    loading,
    error,
    parts,
    refetch: () => {
      if (loading) return
      refetch()
    },
  }
}
