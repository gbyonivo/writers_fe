import * as Speech from 'expo-speech'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Part } from 'writers_shared'

import { stopPlayer } from '../store/slices/player'
import { AppState } from '../types/states/AppState'
import { PlayingStatus } from '../types/states/PlayerState'
import { usePieceParts } from './apollo/use-piece-parts'
import { usePlayAudio } from './use-audio'

export function useSpeaker() {
  const player = useSelector((state: AppState) => state.player)
  const { parts } = usePieceParts(player.pieceId)
  const dispatch = useDispatch()
  const playSound = usePlayAudio()

  useEffect(() => {
    if (!player.pieceId) return
    const partIds = [] as number[]
    ;(parts || []).forEach((part: Part) => {
      if (player.partIds.includes(part.id)) {
        partIds.push(part.id)
      }
    })
    playSound({ pieceId: player.pieceId, partIds })
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
