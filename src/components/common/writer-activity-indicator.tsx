import { ActivityIndicator, useTheme } from 'react-native-paper'

interface Props {
  size?: number | 'small' | 'large'
  color?: string
}

export const WriterActivityIndicator = ({ size = 'large', color }: Props) => {
  const { colors } = useTheme()
  return (
    <ActivityIndicator
      animating
      color={color || colors.onPrimary}
      size={size}
    />
  )
}
