import { useLocalSearchParams } from 'expo-router'

import { PartCreationScreen } from '../../../../src/components/screens/part/part-creation-screen'
import { useOnFocus } from '../../../../src/hooks/use-on-focus'
import { trackScreenView } from '../../../../src/utils/mixpanel'
import { TrackedScreen } from '../../../../src/utils/tracking/tracked-screen'

export default function NewPart() {
  const localSearchParams = useLocalSearchParams()
  useOnFocus(() => {
    trackScreenView({
      screenName: TrackedScreen.NEW_PART_SCREEN,
      params: localSearchParams,
    })
  })
  return <PartCreationScreen />
}
