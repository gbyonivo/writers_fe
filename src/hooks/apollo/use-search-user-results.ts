import { useQuery } from '@apollo/client'
import { User } from 'writers_shared'

import { SEARCH_USERS } from '../../queries/search'
import { Pagination } from '../../types/Pagination'

export const useSearchUserResults = (searchValue?: string) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(SEARCH_USERS, {
    variables: { pagination: { searchValue, first: 10 } },
  })

  const users: Pagination<User> | null = data?.userSearchResults
  return {
    loading,
    error,
    users,
    refetch,
    fetchMore,
  }
}
