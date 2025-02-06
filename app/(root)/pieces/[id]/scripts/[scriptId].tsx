import { useLocalSearchParams } from 'expo-router'
import { useDispatch } from 'react-redux'

import { EditPart } from '../../../../../src/components/screens/part/edit-part'
import { ScriptScreen } from '../../../../../src/components/screens/script/script-screen'
import { useOnFocus } from '../../../../../src/hooks/use-on-focus'
import { setCurrentScreen } from '../../../../../src/store/slices/screen-monitor'
import { trackScreenView } from '../../../../../src/utils/mixpanel'
import { TrackedScreen } from '../../../../../src/utils/tracking/tracked-screen'

export default function Script() {
  const localSearchParams = useLocalSearchParams()
  const dispatch = useDispatch()
  useOnFocus(() => {
    dispatch(setCurrentScreen(TrackedScreen.SCRIPT_SCREEN))
    trackScreenView({
      screenName: TrackedScreen.SCRIPT_SCREEN,
      params: localSearchParams,
    })
  })
  return <ScriptScreen />
}
