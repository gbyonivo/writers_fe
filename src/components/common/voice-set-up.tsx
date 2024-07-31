import { useMemo } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'

import { AppState } from '../../types/states/AppState'
import { WriterSelect } from './inputs/writer-select'

interface VoiceSetUpProps {}

export function VoiceSetUp() {
  const voices = useSelector((state: AppState) => state.player.voices)
  const voiceOptions = useMemo(() => {
    return [
      ...voices.map((voice) => ({
        ...voice,
        value: voice.identifier,
        label: voice.name,
      })),
    ]
  }, [])
  return (
    <View>
      <WriterSelect
        options={voiceOptions}
        name="voice"
        handleChange={() => {}}
        value=""
        label="Select Voice"
      />
    </View>
  )
}
