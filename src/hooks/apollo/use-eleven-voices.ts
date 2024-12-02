import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ElevenVoice } from 'writers_shared'

import { GET_ELEVEN_VOICES } from '../../queries/audio'
import { setIdToElevenVoice } from '../../store/slices/audio'
import { useEnhancedRefetch } from './use-enhanced-refetch'

export const useElevenVoices = () => {
  const dispatch = useDispatch()
  const { data, loading, error, refetch } = useQuery(GET_ELEVEN_VOICES)
  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const elevenVoices: ElevenVoice[] =
    data?.elevenVoices || response?.elevenVoices || []

  useEffect(() => {
    dispatch(
      setIdToElevenVoice(
        elevenVoices.reduce(
          (acc, voice) => ({ ...acc, [voice.id]: voice }),
          {},
        ),
      ),
    )
  }, [elevenVoices])

  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    elevenVoices,
    refetch: enhancedRefetch,
  }
}
