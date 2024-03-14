import { StyleProp, ViewStyle } from 'react-native'
import { IconButton } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

interface Props {
  onPress: () => void
  style?: StyleProp<ViewStyle>
  icon: IconSource
  disabled?: boolean
}

export function WriterIconButton({ onPress, style, icon, disabled }: Props) {
  return (
    <IconButton
      icon={icon}
      mode="contained-tonal"
      onPress={onPress}
      style={style}
      disabled={disabled}
    />
  )
}
