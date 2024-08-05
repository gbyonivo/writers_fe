import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from '../../../types/states/AppState'
import { ChipsSingleSelect } from './chips-single-select'

export interface VoiceSelectProps {
  handleChange: any
  value?: string | null
  name: string
  label?: string
  error?: string
}

export function VoiceSelect({
  value,
  name,
  label,
  error,
  handleChange,
}: VoiceSelectProps) {
  const { voices } = useSelector((state: AppState) => state.player)

  const options = useMemo(() => {
    return voices
      .filter((voice) => voice.language.includes('en'))
      .slice(0, 7)
      .map((voice) => ({
        ...voice,
        label: `${voice.name} ${voice.language}`,
        value: voice.identifier,
      }))
  }, [voices])

  return (
    <ChipsSingleSelect
      value={value}
      name={name}
      label={label}
      handleChange={handleChange}
      error={error}
      options={options}
    />
  )
}
