import axios from 'axios'
import { Audio } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setCurrentSound, stopPlayer } from '../store/slices/player'
import { apiUrl } from '../utils/constants'
import { useAudioMutation } from './apollo/use-audio-mutation'

interface Return {
  playSound: (val: { pieceId: number; partIds: number[] }) => Promise<void>
}

export function usePlayAudio(): Return {
  const [audioUrls, setAudioUrls] = useState<any[]>([])
  const dispatch = useDispatch()

  const play = async (audioUrls: string[]) => {
    for (const url of audioUrls) {
      const { sound } = await Audio.Sound.createAsync({ uri: url })
      dispatch(setCurrentSound(sound))
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
      dispatch(setCurrentSound(null))
      dispatch(stopPlayer())
    }
  }

  const { createAudios } = useAudioMutation({
    onSuccess: ({ data: { createAudios: urls } }) => {
      setAudioUrls(audioUrls)
      play(urls)
    },
  })

  const playSound = async ({
    pieceId,
    partIds,
  }: {
    pieceId: number
    partIds: number[]
  }) => {
    try {
      await createAudios({
        pieceId,
        partIds,
      })
    } catch (error) {
      console.error('Error fetching or playing audio:', error)
    }
  }

  useEffect(() => {
    return () => {
      setAudioUrls([])
    }
  }, [])

  return {
    playSound,
  }
}
