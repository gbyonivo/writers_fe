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
  voices: ExpoVoice[]
}
