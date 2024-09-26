import { StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import { HelperText } from 'react-native-paper'
import { PaperSelect } from 'react-native-paper-select'

import { FontFamily } from '../../../types/font'
import { WriterText } from '../writer-text'

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
  outlineStyle?: ViewStyle
  fontFamily?: FontFamily
}

export function WriterSelect({
  value,
  handleChange,
  name,
  error,
  outlineStyle,
  disabled,
  errorStyle,
  containerStyle,
  label,
  labelComponent,
}: Props) {
  return (
    <View style={containerStyle}>
      {!!label && (
        <WriterText mb={8} fontFamily="Medium">
          {label}
        </WriterText>
      )}
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
      <PaperSelect
        label="Select Gender"
        value={value}
        onSelection={(val: any) =>
          handleChange({ target: { value: val, name } })
        }
        arrayList={[]}
        selectedArrayList={[]}
        errorText={error}
        multiEnable={false}
        hideSearchBox={true}
        textInputMode="outlined"
        textInputOutlineStyle={outlineStyle}
        disabled={disabled}
        errorStyle={errorStyle}
      />
    </View>
  )
}
