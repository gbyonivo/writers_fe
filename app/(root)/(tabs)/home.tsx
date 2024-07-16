import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

import { PieceListInTabs } from '../../../src/components/screens/piece/piece-list-in-tabs'

export default function Home() {
  const theme = useTheme()
  return (
    <PieceListInTabs
      containerStyle={[
        styles.containerStyle,
        { backgroundColor: theme.colors.background },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 4,
  },
})
