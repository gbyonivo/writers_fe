import { useElevenVoices } from './apollo/use-eleven-voices'
import { useGenres } from './apollo/use-genres'

export const useInitializeApp = () => {
  const { loading, error, refetch } = useGenres()
  const {
    loading: loadingVoices,
    error: errorLoadingVoices,
    refetch: refetchVoices,
  } = useElevenVoices()

  return {
    loading: loading || loadingVoices,
    error: error || errorLoadingVoices,
    reinitialise: async () => {
      await refetch()
      await refetchVoices()
    },
  }
}
