import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Part } from 'writers_shared'

import { AppState } from '../types/states/AppState'
import { PlayingStatus } from '../types/states/PlayerState'
import { usePieceParts } from './apollo/use-piece-parts'
import { usePlayAudio } from './use-audio'

export function useSpeaker() {
  const player = useSelector((state: AppState) => state.player)
  const { parts } = usePieceParts(player.pieceId)
  const { playSound } = usePlayAudio()
  const previousStatusRef = useRef(player.status)
  const previousPieceIdRef = useRef(player.pieceId)

  useEffect(() => {
    const play = async () => {
      if (!player.pieceId) return
      const partIds = [] as number[]
      const partArray = parts || []
      partArray.forEach((part: Part) => {
        if (player.partIds.includes(part.id)) {
          partIds.push(part.id)
        }
      })
      if (player.pieceId === previousPieceIdRef.current) {
        return
      }
      try {
        await player.currentSound?.stopAsync()
      } catch (e) {}
      if (player.status === PlayingStatus.PLAYING) {
        playSound({ pieceId: player.pieceId, partIds })
      }
    }
    play()
  }, [parts, player.status])

  useEffect(() => {
    const act = async () => {
      if (player.currentSound && player.status === PlayingStatus.PAUSED) {
        await player.currentSound.pauseAsync()
      } else if (player.currentSound && player.status === PlayingStatus.STOP) {
        try {
          await player.currentSound.stopAsync()
          player.currentSound.unloadAsync()
        } catch (e) {}
      } else if (
        player.currentSound &&
        previousStatusRef.current === PlayingStatus.PAUSED &&
        player.status === PlayingStatus.PLAYING &&
        previousPieceIdRef.current === player.pieceId
      ) {
        await player.currentSound.playAsync()
      }
      previousStatusRef.current = player.status
      previousPieceIdRef.current = player.pieceId
    }
    act()
  }, [player.status, player.pieceId])
}
