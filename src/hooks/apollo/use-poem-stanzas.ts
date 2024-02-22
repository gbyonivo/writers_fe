import { useQuery } from '@apollo/client'
import { Stanza } from 'writers_shared'

import { GET_POEM_STANZAS } from '../../queries/poem'

export const usePoemStanzas = (poemId: number) => {
  const { data, loading, error, refetch } = useQuery(GET_POEM_STANZAS, {
    variables: { id: poemId },
  })

  const stanzas: Stanza[] | null = data?.poemStanzas
  return {
    loading,
    error,
    stanzas,
    refetch: () => {
      if (loading) return
      refetch()
    },
  }
}
