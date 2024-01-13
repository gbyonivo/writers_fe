import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
  children: JSX.Element
}

export function Background({ children }: Props) {
  const { colors } = useTheme()
  return (
    <SafeAreaView
      style={[styles.backgound, { backgroundColor: colors.background }]}
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
