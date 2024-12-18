import { Audio } from 'expo-av'
import { Camera } from 'expo-camera/legacy'
import { useCallback } from 'react'
import { Alert } from 'react-native'

import { isIos } from '../utils/common'
import { trackEvent } from '../utils/mixpanel'
import { TrackedEvent } from '../utils/tracking/tracked-event'

export const useAudioPermissionRequest = () => {
  const [permission, requestPermission] = Camera.useMicrophonePermissions()
  return useCallback(
    (onFinish: () => void) => {
      const ask = async () => {
        if (!permission) {
          trackEvent({
            event: TrackedEvent.AUDIO_PERMISSION_REQUEST,
          })
          Alert.alert(
            'Microphone Access',
            'Allow Writers to access your microphone',
            [
              {
                onPress: () => {
                  trackEvent({
                    event: TrackedEvent.PRESS,
                    params: {
                      buttonName: 'Audio Permission - Allow',
                    },
                  })
                  requestPermission()
                  onFinish()
                },
                text: 'Allow',
              },
              {
                onPress: () => {
                  trackEvent({
                    event: TrackedEvent.PRESS,
                    params: {
                      buttonName: 'Audio Permission - Deny',
                    },
                  })
                },
                text: 'Cancel',
              },
            ],
          )
          return
        } else {
          onFinish()
        }
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
        })
      }
      ask()
    },
    [permission],
  )
}
