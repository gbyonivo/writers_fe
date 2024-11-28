import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ElevenVoice } from 'writers_shared'

import { GET_ELEVEN_VOICES } from '../../queries/audio'
import { setIdToElevenVoice } from '../../store/slices/audio'

export const useElevenVoices = () => {
  const dispatch = useDispatch()
  const { data, loading, error, refetch } = useQuery(GET_ELEVEN_VOICES)

  const elevenVoices: ElevenVoice[] = data?.elevenVoices || []

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
    loading,
    error,
    elevenVoices,
    refetch: () => {
      if (loading) return
      refetch()
    },
  }
}
