import { useQuery } from '@apollo/client'
import { User } from 'writers_shared'

import { SEARCH_USERS } from '../../queries/search'
import { Pagination } from '../../types/Pagination'
import { useEnhancedRefetch } from './use-enhanced-refetch'

export const useSearchUserResults = (searchValue?: string) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(SEARCH_USERS, {
    variables: { pagination: { searchValue, first: 10 } },
  })

  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const users: Pagination<User> | null =
    data?.userSearchResults || response?.userSearchResults
  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    refetch: enhancedRefetch,
    users,
    fetchMore,
  }
}
