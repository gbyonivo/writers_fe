import { useQuery } from '@apollo/client'
import { Poem } from 'writers_shared'

import { GET_POEM } from '../../queries/poem'

export const usePoem = (poemId: number) => {
  const { data, loading, error, refetch } = useQuery(GET_POEM, {
    variables: { id: poemId },
  })

  const poem: Poem | null = data?.poem
  return {
    loading,
    error,
    poem,
    refetch: () => {
      if (loading) return
      refetch()
    },
  }
}
