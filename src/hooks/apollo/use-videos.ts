import { useQuery } from '@apollo/client'
import { Video } from 'writers_shared/dist'

import { GET_VIDEOS } from '../../queries/video'
import { Pagination } from '../../types/Pagination'
import { useEnhancedRefetch } from './use-enhanced-refetch'

export const useVideos = () => {
  const { data, loading, error, refetch, fetchMore } = useQuery(GET_VIDEOS, {
    variables: { pagination: { first: 12 } },
  })

  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const videos: Pagination<Video> | null = data?.videos || response?.videos

  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    videos,
    refetch: enhancedRefetch,
    fetchMore,
  }
}
