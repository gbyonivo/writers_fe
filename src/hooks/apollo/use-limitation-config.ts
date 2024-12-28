import { useQuery } from '@apollo/client'

import { GET_LIMITATION_CONFIG } from '../../queries/user'
import { useEnhancedRefetch } from './use-enhanced-refetch'

export const useLimitationConfig = () => {
  const { data, loading, error, refetch } = useQuery(GET_LIMITATION_CONFIG)

  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const limitationConfig: any | null =
    data?.limitationConfig || response?.limitationConfig || null

  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    refetch: enhancedRefetch,
    limitationConfig,
  }
}
