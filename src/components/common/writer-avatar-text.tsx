import { StyleSheet } from 'react-native'
import { Avatar, useTheme } from 'react-native-paper'

interface Props {
  label: string
  size?: number
}

export function WriterAvatarText({ label, size = 24 }: Props) {
  const theme = useTheme()
  return (
    <Avatar.Text
      size={size}
      label={label}
      color={theme.colors.background}
      style={{ backgroundColor: theme.colors.scrim }}
    />
  )
}
