import { useQuery } from '@apollo/client'
import { Part } from 'writers_shared/dist'

import { GET_PARTS_BY_IDS } from '../../queries/part'

export const usePartsByIds = ({ partIds }: { partIds: number[] }) => {
  const { data, loading, error, refetch } = useQuery(GET_PARTS_BY_IDS, {
    variables: { ids: partIds },
    skip: partIds.length <= 0,
  })

  const parts: Part[] | null = data?.partsByIds
  return {
    loading,
    error,
    parts,
    refetch,
  }
}
