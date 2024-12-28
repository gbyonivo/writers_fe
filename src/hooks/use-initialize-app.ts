import { useElevenVoices } from './apollo/use-eleven-voices'
import { useGenres } from './apollo/use-genres'
import { useLimitationConfig } from './apollo/use-limitation-config'

export const useInitializeApp = () => {
  const { loading, error, refetch } = useGenres()
  const {
    loading: loadingVoices,
    error: errorLoadingVoices,
    refetch: refetchVoices,
  } = useElevenVoices()
  const {
    loading: loadingLimitationConfig,
    error: errorLoadingLimitationConfig,
    refetch: refetchLimitationConfig,
  } = useLimitationConfig()

  return {
    loading: loading || loadingVoices || loadingLimitationConfig,
    error: error || errorLoadingVoices || errorLoadingLimitationConfig,
    reinitialise: async () => {
      await refetch()
      await refetchVoices()
      await refetchLimitationConfig()
    },
  }
}
