import { Audio } from 'expo-av'
import { Camera } from 'expo-camera/legacy'
import { useCallback } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import {
  pausePlayer,
  playPlayer,
  stopPlayer,
} from '../../../store/slices/player'
import { AppState } from '../../../types/states/AppState'
import { PlayingStatus } from '../../../types/states/PlayerState'
import { isIos } from '../../../utils/common'
import { WriterIcon } from '../writer-icon'

export const PlayPauseButton = () => {
  const [permission, requestPermission] = Camera.useMicrophonePermissions()
  const { status } = useSelector((state: AppState) => state.player)
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
        Alert.alert(
          'Microphone Access',
          'Allow Writers to access your microphone',
          [
            { onPress: requestPermission, text: 'Allow' },
            { onPress: () => {}, text: 'Cancel' },
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
      dispatch(playing ? pausePlayer() : playPlayer())
    }
    press()
  }, [permission])

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={play}
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
        onPress={stop}
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
