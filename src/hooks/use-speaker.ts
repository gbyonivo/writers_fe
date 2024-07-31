import * as Speech from 'expo-speech'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { stopPlayer } from '../store/slices/player'
import { AppState } from '../types/states/AppState'
import { PlayingStatus } from '../types/states/PlayerState'
import { usePieceParts } from './apollo/use-piece-parts'

export const useSpeaker = () => {
  const player = useSelector((state: AppState) => state.player)
  const { parts } = usePieceParts(player.pieceId)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!player.pieceId) return
    const partsToRead = (parts || []).filter((part) =>
      player.partIds.includes(part.id),
    )
    Speech.speak(partsToRead.map((p) => p.content).join('.'), {
      onDone: () => {
        dispatch(stopPlayer())
      },
      onStopped: () => {
        dispatch(stopPlayer())
      },
      pitch: 1,
      rate: 0.8,
      voice: 'com.apple.voice.compact.en-IE.Moira',
    })

    return () => {
      Speech.stop()
    }
  }, [parts])

  useEffect(() => {
    if (player.status === PlayingStatus.PAUSED) {
      Speech.pause()
    } else if (player.status === PlayingStatus.STOP) {
      Speech.stop()
    } else if (player.status === PlayingStatus.PLAYING) {
      Speech.resume()
    }
  }, [player.status])
}
