import { Sound } from 'expo-av/build/Audio'

export enum PlayingStatus {
  STOP = 'STOP',
  PAUSED = 'PAUSED',
  PLAYING = 'PLAYING',
}

export interface ExpoVoice {
  identifier: string
  language: string
  name: string
  quality: string
}

export interface PlayerState {
  pieceId?: number
  partIds?: number[]
  title?: string
  status: PlayingStatus
  currentSound: Sound | null
}
