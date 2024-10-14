import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { OnChange, SelectOption } from '../../../types/common'
import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { WriterText } from '../writer-text'
import { WriterImageSegmentedControlItem } from './writer-images-segmented-control-item'

interface Props {
  options: SelectOption[]
  handleChange: OnChange
  name: string
  value: string
}

export function WriterImageSegmentedControl({
  options,
  handleChange,
  name,
  value,
}: Props) {
  const theme = useTheme()
  const handlePress = (option: SelectOption) => {
    handleChange({ target: { value: option._id, name } })
  }

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <WriterImageSegmentedControlItem
          selected={option._id === value}
          key={option._id}
          onPress={handlePress}
          option={option}
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
