import { StyleProp, View, ViewStyle } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { Dropdown } from 'react-native-paper-dropdown'

interface WriterSelectProps {
  options: { value: string; label: string }[]
  value: string
  handleChange: any
  name: string
  label?: string
  containerStyle?: StyleProp<ViewStyle>
}

const OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
]

export function WriterSelect({
  options,
  value,
  handleChange,
  name,
  label,
  containerStyle,
}: WriterSelectProps) {
  return (
    <View style={containerStyle}>
      <PaperProvider>
        <Dropdown
          label={label}
          placeholder={label}
          options={OPTIONS}
          value={'male'}
          onSelect={() => console.log('hello')}
        />
      </PaperProvider>
    </View>
  )
}
