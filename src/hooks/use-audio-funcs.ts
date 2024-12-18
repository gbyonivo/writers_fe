import { useCallback } from 'react'
import TrackPlayer from 'react-native-track-player'

import { useAudioMutation } from './apollo/use-audio-mutation'

interface Params {
  pieceId: number | null
  partIds: number[]
  onDoneFetchingUrls: (urls: string[]) => void
}

export const useAudioHelpers = ({ onDoneFetchingUrls }: Params) => {
  const { createAudios } = useAudioMutation()
  const fetchUrlsForParts = useCallback(
    (param: { pieceId: number; partIds: number[] }) => {
      const fetch = async () => {
        const {
          data: { createAudios: audioUrls },
        } = await createAudios(param)
        onDoneFetchingUrls(audioUrls)
      }

      fetch()
    },
    [],
  )

  const addToTrack = useCallback((audioUrls: string[]) => {
    const add = async () => {
      await TrackPlayer.add(
        audioUrls.map((audioUrl: string) => ({
          url: audioUrl,
          title: 'Avaritia',
        })),
      )
    }
    add()
  }, [])

  return {
    fetchUrlsForParts,
    addToTrack,
  }
}
