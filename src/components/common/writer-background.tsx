import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
  children: JSX.Element
  style?: StyleProp<ViewStyle>
  isView?: boolean
}

export function WriterBackground({ children, style, isView }: Props) {
  const { colors } = useTheme()
  const Comp = isView ? View : SafeAreaView
  return (
    <Comp
      style={[styles.backgound, { backgroundColor: colors.background }, style]}
    >
      {children}
    </Comp>
  )
}

const styles = StyleSheet.create({
  backgound: {
    width: '100%',
    height: '100%',
  },
})
