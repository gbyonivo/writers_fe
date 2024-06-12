import { useTheme } from 'react-native-paper'

import { WriterButton } from './writer-button'
import { WriterText } from './writer-text'

interface Props {
  onPress: () => void
  enableButton: boolean
  label: string
}

export function WriterHeaderButton({ enableButton, onPress, label }: Props) {
  const theme = useTheme()

  return (
    <WriterButton
      onPress={onPress}
      disabled={!enableButton}
      style={{ backgroundColor: 'transparent' }}
    >
      <WriterText
        style={{
          color: !enableButton
            ? theme.colors.onSecondary
            : theme.colors.primary,
        }}
        fontFamily="SemiBold"
      >
        {label}
      </WriterText>
    </WriterButton>
  )
}
