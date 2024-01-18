import { StyleProp, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types'

interface Props {
  style?: StyleProp<TextStyle>
  variant?: VariantProp<never>
  children: string
}

export const WriterText = ({ style, variant, children }: Props) => {
  return (
    <Text variant={variant} style={style}>
      {children}
    </Text>
  )
}
