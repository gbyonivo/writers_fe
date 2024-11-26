import { Audio } from 'expo-av'
import { Camera } from 'expo-camera/legacy'
import { useCallback } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import player, {
  pausePlayer,
  playPlayer,
  stopPlayer,
} from '../../../store/slices/player'
import { AppState } from '../../../types/states/AppState'
import { PlayingStatus } from '../../../types/states/PlayerState'
import { isIos } from '../../../utils/common'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { WriterIcon } from '../writer-icon'

export const PlayPauseButton = () => {
  const [permission, requestPermission] = Camera.useMicrophonePermissions()
  const { status, partIds, pieceId } = useSelector(
    (state: AppState) => state.player,
  )
  const playing = status === PlayingStatus.PLAYING
  const dispatch = useDispatch()
  const stop = () => dispatch(stopPlayer())
  const theme = useTheme()
  const additionButtonStyle = {
    backgroundColor: theme.colors.backdrop,
  }

  const play = useCallback(() => {
    const press = async () => {
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
      }
      if (isIos) {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
        })
      }
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      })
      if (status === PlayingStatus.PAUSED || status === PlayingStatus.STOP) {
        dispatch(playPlayer())
      } else if (status === PlayingStatus.PLAYING) {
        dispatch(pausePlayer())
      }
    }
    press()
  }, [permission, status])

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          trackEvent({
            event: TrackedEvent.PRESS,
            params: {
              partIds,
              pieceId,
              buttonName: `${playing ? 'Pause_Piece_Audio' : 'Play_Piece_Audio'}`,
            },
          })
          play()
        }}
        style={[styles.button, additionButtonStyle]}
      >
        <WriterIcon
          icon={playing ? 'pause' : 'play'}
          size={22}
          color={theme.colors.onSecondary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          trackEvent({
            event: TrackedEvent.PRESS,
            params: {
              partIds,
              pieceId,
              buttonName: 'Stop Piece Audio',
            },
          })
          stop()
        }}
        style={[styles.stopButton, styles.button, additionButtonStyle]}
      >
        <WriterIcon icon="stop" size={22} color={theme.colors.onSecondary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    padding: 8,
    borderRadius: 12,
  },
  stopButton: {
    marginLeft: 16,
  },
})
