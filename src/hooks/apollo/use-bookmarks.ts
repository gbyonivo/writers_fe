import { useQuery } from '@apollo/client'

import { GET_BOOKMARKS } from '../../queries/bookmark'
import { Pagination } from '../../types/Pagination'
import { useEnhancedRefetch } from './use-enhanced-refetch'

export const useBookmarks = ({ userId }: { userId?: number }) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(GET_BOOKMARKS, {
    variables: { pagination: { userId, first: 12 } },
  })

  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const bookmarks: Pagination<any> | null =
    data?.bookmarks || response?.bookmarks
  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    bookmarks,
    refetch: enhancedRefetch,
    fetchMore,
  }
}
