import { useElevenVoices } from './apollo/use-eleven-voices'
import { useGenres } from './apollo/use-genres'

export const useInitializeApp = () => {
  const { loading, error } = useGenres()
  const { loading: loadingVoices, error: errorLoadingVoices } =
    useElevenVoices()

  return {
    loading: loading || loadingVoices,
    error: error || errorLoadingVoices,
  }
}
