import { useGenres } from './apollo/use-genres'

export const useInitializeApp = () => {
  const { loading, error } = useGenres()

  return {
    loading,
    error,
  }
}
