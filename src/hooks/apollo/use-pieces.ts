import { useQuery } from '@apollo/client'
import { Piece, PieceType } from 'writers_shared'

import { GET_PIECES } from '../../queries/piece'
import { Pagination } from '../../types/Pagination'

export const usePieces = ({
  userId,
  type,
}: {
  userId?: number
  type?: PieceType
}) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(GET_PIECES, {
    variables: { pagination: { userId, first: 4, type } },
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
