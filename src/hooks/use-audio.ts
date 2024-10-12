import axios from 'axios'
import { Audio } from 'expo-av'
import { useEffect, useState } from 'react'

import { apiUrl } from '../utils/constants'

export function usePlayAudio() {
  const [audioUrls, setAudioUrls] = useState<any[]>([])

  const play = async (audioUrls: string[]) => {
    for (const url of audioUrls) {
      const { sound } = await Audio.Sound.createAsync({ uri: url })
      await sound.playAsync()

      await new Promise<void>((resolve) => {
        sound.setOnPlaybackStatusUpdate((status) => {
          // @ts-ignore
          if (status.didJustFinish) {
            resolve()
          }
        })
      })

      await sound.unloadAsync()
    }
  }

  const playSound = async ({
    pieceId,
    partIds,
  }: {
    pieceId: number
    partIds: number[]
  }) => {
    if (audioUrls?.length) {
      play(audioUrls)
      return
    }
    try {
      const response = await axios.post(`${apiUrl}/generate-audio`, {
        pieceId,
        partIds,
      })
      const audioUrls = response.data as string[]
      setAudioUrls(audioUrls)
      play(audioUrls)
    } catch (error) {
      console.error('Error fetching or playing audio:', error)
    }
  }

  useEffect(() => {
    return () => setAudioUrls([])
  }, [])

  return playSound
}
