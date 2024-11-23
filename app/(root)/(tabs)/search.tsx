import { WriterBackground } from '../../../src/components/common/writer-background'
import { Results } from '../../../src/components/screens/search/results'
import { useOnFocus } from '../../../src/hooks/use-on-focus'
import { trackEvent, trackScreenView } from '../../../src/utils/mixpanel'
import { TrackedEvent } from '../../../src/utils/tracking/tracked-event'
import { TrackedScreen } from '../../../src/utils/tracking/tracked-screen'

export default function Search() {
  useOnFocus(() => {
    trackScreenView({
      screenName: TrackedScreen.SEARCH_SCREEN,
    })
  })
  return (
    <WriterBackground isView>
      <Results />
    </WriterBackground>
  )
}
