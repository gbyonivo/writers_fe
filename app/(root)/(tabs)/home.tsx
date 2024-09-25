import { SafeAreaView, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { PieceListInGenres } from '../../../src/components/screens/piece/piece-list-in-genres'
import { PieceListInTabs } from '../../../src/components/screens/piece/piece-list-in-tabs'
import { AppState } from '../../../src/types/states/AppState'

export default function Home() {
  const theme = useTheme()
  const { shouldShowTextBasedDesgin } = useSelector(
    (state: AppState) => state.settings,
  )
  return shouldShowTextBasedDesgin ? (
    <PieceListInTabs
      containerStyle={[
        styles.containerStyle,
        { backgroundColor: theme.colors.background },
      ]}
    />
  ) : (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
      <PieceListInGenres
        containerStyle={[
          { backgroundColor: theme.colors.background, paddingBottom: 96 },
        ]}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 4,
  },
})
