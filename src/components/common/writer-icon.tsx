import { Icon, useTheme } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

interface Props {
  size?: number
  icon: IconSource
  color?: string
}

export function WriterIcon({ size = 14, icon, color }: Props) {
  const theme = useTheme()
  return (
    <Icon
      source={icon}
      size={size}
      color={color || theme.colors.onBackground}
    />
  )
}
