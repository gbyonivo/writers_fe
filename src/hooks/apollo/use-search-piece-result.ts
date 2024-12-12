import { useQuery } from '@apollo/client'
import { Piece, PieceType } from 'writers_shared'

import { SEARCH_PIECES } from '../../queries/search'
import { Pagination } from '../../types/Pagination'
import { useEnhancedRefetch } from './use-enhanced-refetch'

interface Params {
  userId?: number
  type?: PieceType
  searchValue: string
}

export const useSearchPieces = ({ searchValue, userId, type }: Params) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(SEARCH_PIECES, {
    variables: { pagination: { searchValue, first: 10, type, userId } },
  })
  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const pieces: Pagination<Piece> | null =
    data?.pieceSearchResults || response?.pieceSearchResults
  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    refetch: enhancedRefetch,
    pieces,
    fetchMore,
  }
}
