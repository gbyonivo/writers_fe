import { useQuery } from '@apollo/client'
import { Piece, PieceType } from 'writers_shared'

import { SEARCH_PIECES } from '../../queries/search'
import { Pagination } from '../../types/Pagination'

interface Params {
  userId?: number
  type?: PieceType
  searchValue: string
}

export const useSearchPieces = ({ searchValue, userId, type }: Params) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(SEARCH_PIECES, {
    variables: { pagination: { searchValue, first: 10, type, userId } },
  })

  const pieces: Pagination<Piece> | null = data?.pieceSearchResults
  return {
    loading,
    error,
    pieces,
    refetch,
    fetchMore,
  }
}
