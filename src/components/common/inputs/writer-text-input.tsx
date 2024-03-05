import * as React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { TextInput as RNPTextInput } from 'react-native-paper'

import { WriterText } from '../writer-text'

interface Props {
  name: string
  value: string
  handleChange: any
  label?: string
  containerStyle?: StyleProp<ViewStyle>
  multiline?: boolean
  labelComponent?: JSX.Element
}

export const WriterTextInput = ({
  name,
  value,
  handleChange,
  label,
  containerStyle,
  multiline,
  labelComponent,
}: Props) => {
  return (
    <View style={containerStyle}>
      {!!label && <WriterText mb={8}>{label}</WriterText>}
      {!!labelComponent && <>{labelComponent}</>}
      <RNPTextInput
        value={value}
        onChangeText={(text) => handleChange({ target: { name, value: text } })}
        mode="outlined"
        multiline={multiline}
        style={multiline ? styles.multilineStyle : undefined}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  multilineStyle: {
    lineHeight: 28,
    minHeight: 100,
  },
})
