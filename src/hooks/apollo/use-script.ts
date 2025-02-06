import { useQuery } from '@apollo/client'

import { GET_SCRIPT } from '../../queries/script'
import { useEnhancedRefetch } from './use-enhanced-refetch'

export const useScript = (scriptId: number) => {
  const { data, loading, error, refetch } = useQuery(GET_SCRIPT, {
    variables: { id: scriptId },
    skip: !scriptId,
  })

  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const script: any | null = data?.script || response?.script
  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    refetch: enhancedRefetch,
    script,
  }
}
