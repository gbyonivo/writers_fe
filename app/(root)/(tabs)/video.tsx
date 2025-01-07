import { View } from 'react-native'
import { useDispatch } from 'react-redux'

import { VideoScreen } from '../../../src/components/screens/video/video-screen'
import { useOnFocus } from '../../../src/hooks/use-on-focus'
import { setCurrentScreen } from '../../../src/store/slices/screen-monitor'
import { trackScreenView } from '../../../src/utils/mixpanel'
import { TrackedScreen } from '../../../src/utils/tracking/tracked-screen'

export default function Video() {
  const dispatch = useDispatch()
  useOnFocus(() => {
    dispatch(setCurrentScreen(TrackedScreen.VIDEO_SCREEN))
    trackScreenView({
      screenName: TrackedScreen.VIDEO_SCREEN,
    })
  })
  return <VideoScreen />
}
