import { useElevenVoices } from './apollo/use-eleven-voices'
import { useGenres } from './apollo/use-genres'
import { useLikedPieceIds } from './apollo/use-get-liked-piece-ids'
import { useLimitationConfig } from './apollo/use-limitation-config'

export const useInitializeApp = () => {
  const { loading, error, refetch } = useGenres()
  const {
    loading: loadingLikedPieceIds,
    error: errorLoadingLikedPieceIds,
    refetch: refetchLikedPieceIds,
  } = useLikedPieceIds()
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
    loading:
      loading ||
      loadingVoices ||
      loadingLimitationConfig ||
      loadingLikedPieceIds,
    error:
      error ||
      errorLoadingVoices ||
      errorLoadingLimitationConfig ||
      errorLoadingLikedPieceIds,
    reinitialise: async () => {
      await refetch()
      await refetchVoices()
      await refetchLimitationConfig()
      await refetchLikedPieceIds()
    },
  }
}
