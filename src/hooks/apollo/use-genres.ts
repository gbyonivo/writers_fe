import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { GET_GENRES } from '../../queries/genre'
import { setGenreIdToGenre } from '../../store/slices/genre'

export const useGenres = () => {
  const dispatch = useDispatch()
  const { data, loading, error, refetch } = useQuery(GET_GENRES)

  const genres: any[] = data?.genres || []

  useEffect(() => {
    dispatch(
      setGenreIdToGenre(
        genres.reduce((acc, genre) => ({ ...acc, [genre.id]: genre }), {}),
      ),
    )
  }, [genres])

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
