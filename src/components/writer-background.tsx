import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
  children: JSX.Element
  style?: StyleProp<ViewStyle>
}

export function WriterBackground({ children, style }: Props) {
  const { colors } = useTheme()
  return (
    <SafeAreaView
      style={[styles.backgound, { backgroundColor: colors.background }, style]}
    >
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backgound: {
    width: '100%',
    height: '100%',
  },
})
