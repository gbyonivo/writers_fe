import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

import { GET_GENRES } from '../../queries/genre'

export const useGenres = () => {
  const { data, loading, error, refetch } = useQuery(GET_GENRES)

  const genres: any[] = data?.genres || []

  useEffect(() => {}, [genres])

  return {
    loading,
    error,
    genres,
    refetch: () => {
      if (loading) return
      refetch()
    },
  }
}
