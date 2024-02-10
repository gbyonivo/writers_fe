import { useQuery } from '@apollo/client'
import { Poem } from 'writers_shared'

import { GET_POEMS } from '../../queries/poem'
import { Pagination } from '../../types/Pagination'

export const usePoems = (userId?: number) => {
  const { data, loading, error } = useQuery(GET_POEMS, {
    variables: { pagination: { userId, first: 6 } },
  })

  const poems: Pagination<Poem> | null = data?.poems
  return {
    loading,
    error,
    poems,
  }
}
