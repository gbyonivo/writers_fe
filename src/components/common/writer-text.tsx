import { useMemo } from 'react'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types'

export type TextAlgin = 'left' | 'right' | 'center'

interface Props {
  style?: StyleProp<TextStyle>
  variant?: VariantProp<never>
  children: string | string[] | number | number[]
  align?: TextAlgin
  mb?: number
  ml?: number
  mr?: number
  mt?: number
  mv?: number
  mh?: number
  size?: number
  color?: string
}

export const WriterText = ({
  style,
  variant,
  children,
  align,
  mb,
  ml,
  mr,
  mt,
  mh,
  mv,
  size = 16,
  color,
}: Props) => {
  const alignmentStyle = useMemo(() => {
    return {
      left: styles.leftAlign,
      right: styles.rightAlign,
      center: styles.centerAlign,
    }[align]
  }, [align])

  const customStyle = {
    marginVertical: mv,
    marginHorizontal: mh,
    marginRight: mr,
    marginLeft: ml,
    marginTop: mt,
    marginBottom: mb,
    fontSize: size,
  }

  const addedColorStyle = color
    ? {
        ...customStyle,
        color,
      }
    : customStyle

  return (
    <Text variant={variant} style={[alignmentStyle, addedColorStyle, style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  leftAlign: {
    textAlign: 'left',
  },
  rightAlign: {
    textAlign: 'right',
  },
  centerAlign: {
    textAlign: 'center',
  },
})
