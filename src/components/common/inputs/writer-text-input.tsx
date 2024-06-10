import * as React from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
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
  style?: StyleProp<TextStyle>
  errorStyle?: StyleProp<TextStyle>
  outlineStyle?: StyleProp<ViewStyle>
  mode?: 'outlined' | 'flat'
  autoFocus?: boolean
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

export function WriterTextInput({
  name,
  value,
  handleChange,
  label,
  containerStyle,
  outlineStyle,
  multiline,
  labelComponent,
  disabled,
  style,
  error,
  errorStyle,
  mode = 'outlined',
  autoFocus = false,
  autoCapitalize = 'none',
}: Props) {
  return (
    <View style={containerStyle}>
      {!!label && <WriterText mb={8}>{label}</WriterText>}
      {!!labelComponent && <>{labelComponent}</>}
      {!!error && (
        <HelperText
          type="error"
          visible={!!error}
          style={[errorStyle, styles.error]}
        >
          {error}
        </HelperText>
      )}
      <RNPTextInput
        value={value}
        onChangeText={(text) => handleChange({ target: { name, value: text } })}
        mode={mode}
        multiline={multiline}
        style={[style, multiline ? styles.multilineStyle : undefined]}
        disabled={disabled}
        outlineStyle={outlineStyle}
        autoFocus={autoFocus}
        autoCapitalize={autoCapitalize}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  multilineStyle: {
    lineHeight: 28,
  },
  error: {
    fontSize: 12,
    marginLeft: -12,
  },
})
