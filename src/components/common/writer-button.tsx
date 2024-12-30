import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

interface Props {
  onPress: () => void
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
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
  labelStyle,
}: Props) {
  const { colors } = useTheme()
  return (
    <Button
      icon={icon}
      mode="contained-tonal"
      onPress={onPress}
      style={style}
      contentStyle={[
        iconRight ? { flexDirection: 'row-reverse' } : {},
        styles.button,
      ]}
      uppercase
      disabled={disabled}
      textColor={textColor}
      labelStyle={labelStyle}
      buttonColor={disabled ? undefined : colors.scrim}
    >
      {children}
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 2,
  },
})
