import { BlurView } from 'expo-blur'
import { StyleProp, ViewStyle } from 'react-native'
import { Chip } from 'react-native-paper'

interface WriterChipProps {
  label: string | number
  style?: StyleProp<ViewStyle>
}

export function WriterChip({ label, style }: WriterChipProps) {
  return (
    <Chip style={style}>
      <BlurView />
      {label}
    </Chip>
  )
}
