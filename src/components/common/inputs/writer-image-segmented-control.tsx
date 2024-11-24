import React from 'react'
import { ImageStyle, StyleProp, StyleSheet, View } from 'react-native'

import { OnChange, SelectOption } from '../../../types/common'
import { WriterImageSegmentedControlItem } from './writer-images-segmented-control-item'

interface Props {
  options: SelectOption[]
  handleChange: OnChange
  name: string
  value: string
  imageStyle?: StyleProp<ImageStyle>
}

export function WriterImageSegmentedControl({
  options,
  handleChange,
  name,
  value,
  imageStyle,
}: Props) {
  const handlePress = (option: SelectOption) => {
    handleChange({ target: { value: option.value, name } })
  }

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <WriterImageSegmentedControlItem
          selected={option.value === value}
          key={option.value}
          onPress={handlePress}
          option={option}
          imageStyle={imageStyle}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
})
