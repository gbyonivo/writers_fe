import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { WriterBackground } from '../../../src/components/common/writer-background'
import { PieceListInGenres } from '../../../src/components/screens/piece/piece-list-in-genres'
import { PieceListInTabs } from '../../../src/components/screens/piece/piece-list-in-tabs'
import { PieceListInGenresTabs } from '../../../src/components/screens/piece/piece.list-in-genres-tabs'
import { useOnFocus } from '../../../src/hooks/use-on-focus'
import { setCurrentScreen } from '../../../src/store/slices/screen-monitor'
import { AppState } from '../../../src/types/states/AppState'
import { trackScreenView } from '../../../src/utils/mixpanel'
import { TrackedScreen } from '../../../src/utils/tracking/tracked-screen'

export default function Home() {
  const { shouldShowTextBasedDesgin } = useSelector(
    (state: AppState) => state.settings,
  )
  const dispatch = useDispatch()

  useOnFocus(() => {
    dispatch(setCurrentScreen(TrackedScreen.HOME_SCREEN))
    trackScreenView({
      screenName: TrackedScreen.HOME_SCREEN,
    })
  })

  return shouldShowTextBasedDesgin ? (
    <PieceListInTabs
      containerStyle={[styles.containerStyle]}
      trackedScreen={TrackedScreen.HOME_SCREEN}
    />
  ) : (
    <WriterBackground isView>
      <PieceListInGenresTabs />
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 4,
  },
})
