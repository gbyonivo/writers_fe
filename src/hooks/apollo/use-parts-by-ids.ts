import { useQuery } from '@apollo/client'
import { Part } from 'writers_shared/dist'

import { GET_PARTS_BY_IDS } from '../../queries/part'
import { useEnhancedRefetch } from './use-enhanced-refetch'

export const usePartsByIds = ({ partIds }: { partIds: number[] }) => {
  const { data, loading, error, refetch } = useQuery(GET_PARTS_BY_IDS, {
    variables: { ids: partIds },
    skip: partIds.length <= 0,
  })
  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const parts: Part[] | null = data?.partsByIds || response?.partsByIds
  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    parts,
    refetch: enhancedRefetch,
  }
}
