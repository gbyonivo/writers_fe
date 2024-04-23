import * as React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { HelperText, TextInput as RNPTextInput } from 'react-native-paper'

import { WriterText } from '../writer-text'

interface Props {
  name: string
  value: string
  handleChange: any
  label?: string
  containerStyle?: StyleProp<ViewStyle>
  multiline?: boolean
  labelComponent?: JSX.Element
  disabled?: boolean
  error?: string
}

export function WriterTextInput({
  name,
  value,
  handleChange,
  label,
  containerStyle,
  multiline,
  labelComponent,
  disabled,
  error,
}: Props) {
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
        disabled={disabled}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </View>
  )
}

const styles = StyleSheet.create({
  multilineStyle: {
    lineHeight: 28,
    height: 250,
  },
})
