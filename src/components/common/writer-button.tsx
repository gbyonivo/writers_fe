import { StyleProp, ViewStyle } from 'react-native'
import { Button } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

interface Props {
  onPress: () => void
  style?: StyleProp<ViewStyle>
  children: JSX.Element | string
  icon?: IconSource
  disabled?: boolean
  textColor?: string
}

export function WriterButton({
  onPress,
  style,
  children,
  icon,
  disabled,
  textColor,
}: Props) {
  return (
    <Button
      icon={icon}
      mode="contained-tonal"
      onPress={onPress}
      style={style}
      uppercase
      disabled={disabled}
      textColor={textColor}
    >
      {children}
    </Button>
  )
}
