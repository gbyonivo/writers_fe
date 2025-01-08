import { StyleProp, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

import { WriterButton } from './writer-button'
import { WriterText } from './writer-text'

interface Props {
  onPress: () => void
  enableButton: boolean
  label: string
  icon?: IconSource
  iconRight?: boolean
  style?: StyleProp<ViewStyle>
}

export function WriterHeaderButton({
  enableButton,
  onPress,
  label,
  icon,
  iconRight,
  style,
}: Props) {
  const theme = useTheme()

  return (
    <WriterButton
      onPress={onPress}
      disabled={!enableButton}
      style={[{ backgroundColor: 'transparent' }, style]}
      icon={icon}
      iconRight={iconRight}
      iconColor={
        !enableButton ? theme.colors.onSecondary : theme.colors.outlineVariant
      }
    >
      <WriterText
        style={{
          color: !enableButton
            ? theme.colors.onSecondary
            : theme.colors.outlineVariant,
        }}
        fontFamily="SemiBold"
      >
        {label}
      </WriterText>
    </WriterButton>
  )
}
