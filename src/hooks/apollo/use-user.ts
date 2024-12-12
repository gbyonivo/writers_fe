import { useQuery } from '@apollo/client'
import { User } from 'writers_shared'

import { GET_USER } from '../../queries/user'
import { useEnhancedRefetch } from './use-enhanced-refetch'

export const useUser = (userId: number) => {
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { id: userId },
  })

  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const user: User | null = data?.user || response?.user || null
  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    refetch: enhancedRefetch,
    user,
  }
}
