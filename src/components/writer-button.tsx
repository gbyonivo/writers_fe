import { StyleProp, ViewStyle } from 'react-native'
import { Button } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

interface Props {
  onPress: () => void
  style?: StyleProp<ViewStyle>
  children: JSX.Element | string
  icon?: IconSource
  disabled?: boolean
}

export const WriterButton = ({
  onPress,
  style,
  children,
  icon,
  disabled,
}: Props) => {
  return (
    <Button
      icon={icon}
      mode="contained-tonal"
      onPress={onPress}
      style={style}
      uppercase
      disabled={disabled}
    >
      {children}
    </Button>
  )
}
