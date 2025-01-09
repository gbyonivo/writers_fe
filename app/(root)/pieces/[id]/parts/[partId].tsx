import { useLocalSearchParams } from 'expo-router'
import { useDispatch } from 'react-redux'

import { EditPart } from '../../../../../src/components/screens/part/edit-part'
import { PartCreationScreen } from '../../../../../src/components/screens/part/part-creation-screen'
import { useOnFocus } from '../../../../../src/hooks/use-on-focus'
import { setCurrentScreen } from '../../../../../src/store/slices/screen-monitor'
import { trackScreenView } from '../../../../../src/utils/mixpanel'
import { TrackedScreen } from '../../../../../src/utils/tracking/tracked-screen'

export default function Part() {
  const localSearchParams = useLocalSearchParams()
  const dispatch = useDispatch()
  useOnFocus(() => {
    dispatch(setCurrentScreen(TrackedScreen.NEW_PART_SCREEN))
    trackScreenView({
      screenName: TrackedScreen.NEW_PART_SCREEN,
      params: localSearchParams,
    })
  })
  return <EditPart />
}
