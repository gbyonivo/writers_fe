import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { HelperText, useTheme } from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select'

import { SelectOption } from '../../../types/common'
import { FontFamily } from '../../../types/font'
import { WriterText } from '../writer-text'
import { WriterLabel } from './writer-label'

interface Props {
  name: string
  value: string
  handleChange: any
  label?: string
  containerStyle?: StyleProp<ViewStyle>
  labelComponent?: JSX.Element
  disabled?: boolean
  error?: string
  errorStyle?: TextStyle
  style?: StyleProp<ViewStyle>
  fontFamily?: FontFamily
  options: SelectOption[]
}

export function WriterSelect({
  value,
  handleChange,
  name,
  error,
  errorStyle,
  containerStyle,
  label,
  labelComponent,
  options,
  style: selectStyle,
}: Props) {
  const theme = useTheme()
  const style = [
    styles.selected,
    {
      borderColor: theme.colors.onBackground,
      color: theme.colors.onBackground,
    },
    selectStyle,
  ]
  return (
    <View style={containerStyle}>
      {!!labelComponent && <>{labelComponent}</>}
      {!!error && (
        <HelperText
          type="error"
          visible={!!error}
          style={[errorStyle, { fontFamily: 'Poppins-Light' as FontFamily }]}
        >
          {error}
        </HelperText>
      )}
      <WriterLabel label={label} />
      <RNPickerSelect
        darkTheme
        value={value}
        onValueChange={(value) => {
          handleChange({
            target: {
              value,
              name,
            },
          })
        }}
        items={options}
        style={{
          inputIOS: style,
          inputAndroid: style,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  selected: {
    color: 'red',
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
  },
})
