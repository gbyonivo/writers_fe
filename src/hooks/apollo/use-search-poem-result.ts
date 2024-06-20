import { useQuery } from '@apollo/client'
import { Poem } from 'writers_shared'

import { SEARCH_POEMS } from '../../queries/search'
import { Pagination } from '../../types/Pagination'

export const useSearchPoems = (searchValue?: string) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(SEARCH_POEMS, {
    variables: { pagination: { searchValue, first: 10 } },
  })

  const poems: Pagination<Poem> | null = data?.poemSearchResults
  return {
    loading,
    error,
    poems,
    refetch,
    fetchMore,
  }
}
