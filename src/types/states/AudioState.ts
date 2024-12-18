import { ElevenVoice } from 'writers_shared/dist'

import { AudioStatus } from '../audio'

export interface AudioState {
  idToElevenVoice: { [key: number]: ElevenVoice }
  pieceId?: number
  partIds: number[]
  status: AudioStatus
}
