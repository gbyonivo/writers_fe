import { useQuery } from '@apollo/client'

import { GET_BOOKMARKS } from '../../queries/bookmark'
import { Pagination } from '../../types/Pagination'

export const useBookmarks = ({ userId }: { userId?: number }) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(GET_BOOKMARKS, {
    variables: { pagination: { userId, first: 12 } },
  })

  const bookmarks: Pagination<any> | null = data?.bookmarks
  return {
    loading,
    error,
    bookmarks,
    refetch,
    fetchMore,
  }
}
