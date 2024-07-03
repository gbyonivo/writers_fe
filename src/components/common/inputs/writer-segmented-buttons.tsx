import * as React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { SegmentedButtons } from 'react-native-paper'

interface WriterSegmentedButtonsProps {
  value: string | undefined
  handleChange: any
  name: string
  containerStyle?: StyleProp<ViewStyle>
  options: { value: string; label: string }[]
}

export function WriterSegmentedButtons({
  options,
  handleChange,
  name,
  value,
}: WriterSegmentedButtonsProps) {
  return (
    <SegmentedButtons
      value={value}
      onValueChange={(val: string) =>
        handleChange({ target: { name, value: val } })
      }
      buttons={options}
    />
  )
}
