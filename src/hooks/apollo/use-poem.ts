import { useQuery } from '@apollo/client'
import { Poem } from 'writers_shared'

import { GET_POEM } from '../../queries/poem'

export const usePoems = (poemId: number) => {
  const { data, loading, error } = useQuery(GET_POEM, {
    variables: { id: poemId },
  })

  const poem: Poem | null = data?.poem
  return {
    loading,
    error,
    poem,
  }
}
