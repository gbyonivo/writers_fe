import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { WriterBackground } from '../../../src/components/common/writer-background'
import { PieceListInGenres } from '../../../src/components/screens/piece/piece-list-in-genres'
import { PieceListInTabs } from '../../../src/components/screens/piece/piece-list-in-tabs'
import { useOnFocus } from '../../../src/hooks/use-on-focus'
import { AppState } from '../../../src/types/states/AppState'
import { trackScreenView } from '../../../src/utils/mixpanel'
import { TrackedScreen } from '../../../src/utils/tracking/tracked-screen'

export default function Home() {
  const theme = useTheme()
  const { shouldShowTextBasedDesgin } = useSelector(
    (state: AppState) => state.settings,
  )

  useOnFocus(() => {
    trackScreenView({
      screenName: TrackedScreen.HOME_SCREEN,
    })
  })

  return shouldShowTextBasedDesgin ? (
    <PieceListInTabs
      containerStyle={[
        styles.containerStyle,
        { backgroundColor: theme.colors.background },
      ]}
      trackedScreen={TrackedScreen.HOME_SCREEN}
    />
  ) : (
    <WriterBackground isView>
      <PieceListInGenres containerStyle={[{ paddingBottom: 96 }]} />
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 4,
  },
})
