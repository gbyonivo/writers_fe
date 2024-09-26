import { View } from 'react-native'
import { Country, Sex, SpeakerStyle } from 'writers_shared'

export interface VoiceSetUpValue {
  sex: Sex
  country: Country
  style: SpeakerStyle
  preDelay: number
  postDelay: number
}

interface VoiceSetUpProps {
  value: VoiceSetUpValue
  handleChange: any
}

export function VoiceSetUp({ value, handleChange }: VoiceSetUpProps) {
  return <View>{/* <Select /> */}</View>
}

// const readThis = async () => {
//   setLoading(true)
//   try {
//     const res = await openai.audio.speech.create({
//       model: 'tts-1',
//       voice: 'alloy',
//       input: 'Today is a wonderful day to build something people love!',
//     })
//   } catch (error) {
//     setLoading(false)
//     setError(`${error}`)
//     console.error(`Error reading text ${error}`)
//   }
// }
