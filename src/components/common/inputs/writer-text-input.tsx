import * as React from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { HelperText, TextInput as RNPTextInput } from 'react-native-paper'

import { FontFamily } from '../../../types/font'
import { WriterText } from '../writer-text'

interface Props {
  name: string
  value: string | number
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
  fontFamily?: FontFamily
  numberOfLines?: number
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
  fontFamily = 'Medium',
  numberOfLines,
}: Props) {
  return (
    <View style={containerStyle}>
      {!!error && (
        <HelperText
          type="error"
          visible={!!error}
          style={[
            errorStyle,
            styles.error,
            { fontFamily: 'Poppins-Light' as FontFamily },
          ]}
        >
          {error}
        </HelperText>
      )}
      <RNPTextInput
        label={label}
        value={`${value}`}
        onChangeText={(text) => handleChange({ target: { name, value: text } })}
        mode={mode}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={[
          style,
          multiline ? styles.multilineStyle : undefined,
          { fontFamily },
        ]}
        contentStyle={{ fontFamily }}
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
