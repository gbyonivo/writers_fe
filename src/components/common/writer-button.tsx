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
  iconRight?: boolean
}

export function WriterButton({
  onPress,
  style,
  children,
  icon,
  disabled,
  textColor,
  iconRight,
}: Props) {
  return (
    <Button
      icon={icon}
      mode="contained-tonal"
      onPress={onPress}
      style={style}
      contentStyle={[iconRight ? { flexDirection: 'row-reverse' } : {}]}
      uppercase
      disabled={disabled}
      textColor={textColor}
    >
      {children}
    </Button>
  )
}
