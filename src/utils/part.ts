import { Part, SpeakerNamesByCountryAndSex } from 'writers_shared/dist/index'

import { VoiceSetUpValue } from '../components/common/voice-set-up'

export const createPartWithVoiceSetup = ({
  value,
  pieceId,
  position,
  parentPartId,
  voiceId,
}: {
  value: { content: string; voiceSetup: VoiceSetUpValue }
  pieceId?: number
  position: number
  parentPartId?: number
  voiceId: string
}): Part => ({
  content: value.content,
  speakerPostBreakTime: parseFloat(`${value.voiceSetup.postDelay || 1}`),
  speakerPreBreakTime: parseFloat(`${value.voiceSetup.preDelay || 1}`),
  speakerName:
    SpeakerNamesByCountryAndSex[value.voiceSetup.country][value.voiceSetup.sex],
  pieceId,
  position,
  partId: parentPartId,
  // @ts-ignore
  speakerStyle: value.voiceSetup.style,
  voiceId,
})
