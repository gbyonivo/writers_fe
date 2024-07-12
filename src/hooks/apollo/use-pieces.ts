import { useQuery } from '@apollo/client'
import { Piece } from 'writers_shared'

import { GET_PIECES } from '../../queries/piece'
import { Pagination } from '../../types/Pagination'

export const usePieces = (userId?: number) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(GET_PIECES, {
    variables: { pagination: { userId, first: 6 } },
  })

  const pieces: Pagination<Piece> | null = data?.pieces
  return {
    loading,
    error,
    pieces,
    refetch,
    fetchMore,
  }
}
