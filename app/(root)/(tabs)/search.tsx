import { useDispatch } from 'react-redux'

import { WriterBackground } from '../../../src/components/common/writer-background'
import { WriterHeader } from '../../../src/components/common/writer-header'
import WriterSearchBar from '../../../src/components/common/writer-search-bar'
import { Results } from '../../../src/components/screens/search/results'
import { useOnFocus } from '../../../src/hooks/use-on-focus'
import { setCurrentScreen } from '../../../src/store/slices/screen-monitor'
import { trackScreenView } from '../../../src/utils/mixpanel'
import { TrackedScreen } from '../../../src/utils/tracking/tracked-screen'

export default function Search() {
  const dispatch = useDispatch()
  useOnFocus(() => {
    dispatch(setCurrentScreen(TrackedScreen.SEARCH_SCREEN))
    trackScreenView({
      screenName: TrackedScreen.SEARCH_SCREEN,
    })
  })
  return (
    <WriterBackground isView>
      <WriterHeader hideBackButton containerStyle={styles.header}>
        <WriterSearchBar />
      </WriterHeader>
      <Results />
    </WriterBackground>
  )
}

const styles = {
  header: {
    marginLeft: 0,
    marginBottom: 32,
  },
}
