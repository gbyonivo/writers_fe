import { ElevenVoice } from 'writers_shared/dist'

export interface AudioState {
  idToElevenVoice: { [key: number]: ElevenVoice }
}
