import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { GET_GENRES } from '../../queries/genre'
import { setGenreIdToGenre } from '../../store/slices/genre'
import { useEnhancedRefetch } from './use-enhanced-refetch'

export const useGenres = () => {
  const dispatch = useDispatch()
  const { data, loading, error, refetch } = useQuery(GET_GENRES)
  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const genres: any[] = data?.genres || response?.genres || []

  useEffect(() => {
    dispatch(
      setGenreIdToGenre(
        genres.reduce((acc, genre) => ({ ...acc, [genre.id]: genre }), {}),
      ),
    )
  }, [genres])

  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    genres,
    refetch: enhancedRefetch,
  }
}
