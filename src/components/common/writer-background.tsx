import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
  children?: JSX.Element | JSX.Element[]
  style?: StyleProp<ViewStyle>
  isView?: boolean
}

export function WriterBackground({ children, style, isView }: Props) {
  const { colors } = useTheme()
  const Comp = isView ? View : SafeAreaView
  return (
    <Comp
      style={[styles.background, { backgroundColor: colors.background }, style]}
    >
      {children ? children : <View />}
    </Comp>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
})
