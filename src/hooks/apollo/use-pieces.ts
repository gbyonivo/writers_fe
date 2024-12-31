import { useQuery } from '@apollo/client'
import { Piece, PieceType } from 'writers_shared'

import { GET_PIECES } from '../../queries/piece'
import { Pagination } from '../../types/Pagination'
import { useEnhancedRefetch } from './use-enhanced-refetch'

export const usePieces = ({
  userId,
  type,
  genreIds = [],
}: {
  userId?: number
  type?: PieceType
  genreIds?: number[]
}) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(GET_PIECES, {
    variables: { pagination: { userId, first: 4, type, genreIds } },
  })

  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const pieces: Pagination<Piece> | null = data?.pieces || response?.pieces
  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    refetch: enhancedRefetch,
    pieces,
    fetchMore,
  }
}
