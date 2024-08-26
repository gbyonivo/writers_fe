import { useIsFocused } from '@react-navigation/native'
import * as Speech from 'expo-speech'
import { useEffect } from 'react'
import { View } from 'react-native'

import { ChipsSingleSelect } from './inputs/chips-single-select'
import { VoiceSelect } from './inputs/voice-select'
import { WriterRangeSlider } from './inputs/writer-range-slider'
import { WriterButton } from './writer-button'
import { WriterText } from './writer-text'

interface VoiceSetUpProps {
  testText?: string
  identifier?: string
  identifierName: string
  identifierError?: string

  pitch: number
  pitchName: string
  pitchLabel?: string
  pitchError?: string

  rate: number
  rateName: string
  rateLabel?: string
  rateError?: string

  handleChange: any
}

const RATE_OPTIONS = [
  { value: 0.5, label: 'Slow' },
  { value: 1, label: 'Normal' },
  { value: 1.1, label: 'Fast' },
]

export function VoiceSetUp({
  testText = 'You look beautiful today!',
  identifier,
  identifierName,
  identifierError,
  handleChange,
  pitch,
  pitchName,
  pitchLabel,
  rate,
  rateName,
  rateLabel,
}: VoiceSetUpProps) {
  const isFocussed = useIsFocused()
  const onPressTest = () => {
    Speech.speak(testText.split('\n').join(','), {
      voice: identifier,
      pitch,
      rate,
    })
  }

  useEffect(() => {
    Speech.stop()
  }, [identifier, rate, pitch])

  useEffect(() => {
    if (!isFocussed) Speech.stop()
    return () => {
      Speech.stop()
    }
  }, [isFocussed])

  return (
    <View>
      <VoiceSelect
        name={identifierName}
        error={identifierError}
        handleChange={handleChange}
        value={identifier}
      />
      <WriterRangeSlider
        handleChange={handleChange}
        label={pitchLabel}
        name={pitchName}
        multiplier={0.1}
        valueMultiplier={10}
        containerStyle={{ marginVertical: 16 }}
        value={pitch}
      />
      <ChipsSingleSelect
        handleChange={handleChange}
        label={rateLabel}
        name={rateName}
        options={RATE_OPTIONS}
        value={rate}
      />
      <WriterButton
        onPress={onPressTest}
        style={{ alignSelf: 'flex-start', marginTop: 8 }}
        disabled={!identifier}
      >
        <WriterText>Test sound</WriterText>
      </WriterButton>
    </View>
  )
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
