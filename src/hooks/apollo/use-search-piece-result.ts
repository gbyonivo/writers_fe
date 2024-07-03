import { useQuery } from '@apollo/client'
import { Piece } from 'writers_shared'

import { SEARCH_PIECES } from '../../queries/search'
import { Pagination } from '../../types/Pagination'

export const useSearchPieces = (searchValue?: string) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(SEARCH_PIECES, {
    variables: { pagination: { searchValue, first: 10 } },
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
